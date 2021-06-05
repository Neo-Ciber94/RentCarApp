import { VehicleDTO } from "@shared/types";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ButtonProps,
  Container,
  FormStep,
  MultiStepForm,
} from "src/components";
import { Routes } from "src/layout";
import { Services } from "src/services";
import { RentFormValues, RentConfirmation } from ".";
import { RentClientForm } from "./RentClientForm";
import { RentInspectionForm } from "./RentInspectionForm";
import { RentVehicleSelection } from "./RentVehicleSelection";
import {
  inspectionValidationSchema,
  rentValidationSchema,
} from "./validationSchemas";

interface RentFormProps {
  initialValues: RentFormValues;
}

export const RentForm: React.FC<RentFormProps> = ({ initialValues }) => {
  const history = useHistory();
  const [selectedVehicle, setVehicle] = useState<VehicleDTO>();

  const steps: FormStep<RentFormValues>[] = [
    {
      label: "Vehicle",
      validationSchema: rentValidationSchema,
      render: ({ errors, ...formik }) => (
        <RentVehicleSelection
          onSelect={(v) => {
            setVehicle(v);
            formik.setFieldValue("vehicleId", v.id);
          }}
          selected={selectedVehicle!}
          errors={errors}
        />
      ),
    },

    {
      label: "Client",
      validationSchema: rentValidationSchema,
      render: ({ errors, touched, values }) => (
        <RentClientForm errors={errors} touched={touched} values={values} />
      ),
    },

    {
      label: "Inspection",
      validationSchema: inspectionValidationSchema,
      render: ({ errors, touched, values }) => (
        <RentInspectionForm errors={errors} touched={touched} values={values} />
      ),
    },

    {
      label: "Confirmation",
      render: ({ values }) => <RentConfirmation values={values} />,
    },
  ];

  return (
    <Container className="lg:max-w-5xl">
      <MultiStepForm
        initialValues={initialValues}
        steps={steps}
        onNext={async (step, formik) => {
          if (step === 0) {
            formik.validateField("vehicleId");
            return !!selectedVehicle?.id;
          }

          if (step >= 1) {
            const errors = await formik.validateForm(formik.values);
            return Object.keys(errors).length === 0;
          }

          return false;
        }}
        onSubmit={async (values, actions) => {
          await submitRent(values, actions);
          history.push(Routes.rent.path);
        }}
      />
    </Container>
  );
};

async function submitRent(
  values: RentFormValues,
  actions: FormikHelpers<RentFormValues>
) {
  // FIXME: This should happen in a transation
  const client = await Services.clients.create({
    name: values.name,
    email: values.email,
    creditCard: values.creditCard,
    creditLimit: values.creditLimit!,
    documentId: values.documentId,
    legalPerson: values.legalPerson,
  });

  const rent = await Services.rents.create({
    clientId: client.id,
    employeeId: values.employeeId,
    vehicleId: values.vehicleId,
    comments: values.comments!,
  });

  const inspection = await Services.inspections.create({
    vehicleId: values.vehicleId,
    rentId: rent.id,
    haveBrokenGlass: values.haveBrokenGlass,
    haveCarJack: values.haveCarJack,
    haveScratches: values.haveScratches,
    haveTires: values.haveTires,
    tireStatus: values.tireStatus,
    status: values.status!,
  });

  console.log(client, rent, inspection);

  actions.setSubmitting(false);
}
