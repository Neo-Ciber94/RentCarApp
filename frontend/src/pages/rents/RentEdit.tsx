import { FormikProps } from "formik";
import { useHistory, useParams } from "react-router";
import { FormStep, Loading, MultiStepForm } from "src/components";
import { useRent } from "src/hooks";
import { RentValues, RentClientValues } from ".";
import { RentClientForm } from "./RentClientForm";
import { RentFormValues } from "./RentFormValues";
import { RentVehicleSelection } from "./RentVehicleSelection";
import { Container } from "src/components";
import {
  rentValidationSchema,
  vehicleValidationSchema,
} from "./validationSchema";
import { Services } from "src/services";
import { BaseRoutes } from "src/layout";
import React from "react";
import NotFound from "../common/NotFound";

type UpdateRent = RentValues & RentClientValues;

export function RentEdit() {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { isLoading, data } = useRent(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  // Its already returned
  if (data.returnDate) {
    return <NotFound />;
  }

  const steps: FormStep<UpdateRent>[] = [
    {
      label: "Vehicle",
      validationSchema: vehicleValidationSchema,
      render: (formik) => (
        <RentVehicleSelection
          selectedId={data.vehicleId}
          onSelect={(v) => {
            formik.setFieldValue("vehicleId", v.id);
          }}
        />
      ),
    },

    {
      label: "Client",
      validationSchema: rentValidationSchema,
      render: (formik) => (
        <RentClientForm
          props={formik as unknown as FormikProps<RentFormValues>}
        />
      ),
    },
  ];

  const initialValues: UpdateRent = {
    rentId: data.id,
    vehicleId: data.vehicleId,
    name: data.client.name,
    email: data.client.email,
    creditCard: data.client.creditCard,
    creditLimit: data.client.creditLimit,
    documentId: data.client.documentId,
    employeeId: data.employeeId,
    employee: data.employee,
    legalPerson: data.client.legalPerson,
    clientId: data.clientId,
    comments: data.comments,
    rentDate: data.returnDate,
    returnDate: data.returnDate,
    totalDays: data.totalDays,
    totalPrice: data.totalPrice,
  };

  return (
    <Container className="lg:max-w-5xl">
      <MultiStepForm
        initialValues={initialValues}
        steps={steps}
        submitButtonText="Update"
        onCancel={() => history.push("/rents")}
        onSubmit={async (values, actions) => {
          await Services.rents.update({
            id: values.rentId,
            vehicleId: values.vehicleId,
            comments: values.comments,
          });

          await Services.clients.update({
            id: values.clientId,
            name: values.name,
            email: values.email,
            creditCard: values.creditCard,
            creditLimit: values.creditLimit,
            documentId: values.documentId,
            legalPerson: values.legalPerson,
          });

          actions.setSubmitting(false);
          history.push(BaseRoutes.rent.path);
        }}
      />
    </Container>
  );
}
