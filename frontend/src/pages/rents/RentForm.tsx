import { VehicleDTO } from "@shared/types";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, FormStep, MultiStepForm } from "src/components";
import Routes from "src/routes/Routes";
import { Services } from "src/services";
import { RentFormValues, RentConfirmation } from ".";
import { RentClientForm } from "./RentClientForm";
import { RentInspectionForm } from "./RentInspectionForm";
import { RentVehicleSelection } from "./RentVehicleSelection";
import {
  inspectionValidationSchema,
  rentValidationSchema,
  vehicleValidationSchema,
} from "./validationSchema";

interface RentFormProps {
  initialValues: RentFormValues;
}

export const RentForm: React.FC<RentFormProps> = ({ initialValues }) => {
  const history = useHistory();
  const [vehicle, setVehicle] = useState<VehicleDTO>();

  const steps: FormStep<RentFormValues>[] = [
    {
      label: "Vehicle",
      validationSchema: vehicleValidationSchema,
      render: ({ errors, ...formik }) => (
        <RentVehicleSelection
          onSelect={(v) => {
            setVehicle(v);
            formik.setFieldValue("vehicleId", v.id);
          }}
          selectedId={vehicle?.id}
          error={errors.vehicleId}
        />
      ),
    },

    {
      label: "Client",
      validationSchema: rentValidationSchema,
      render: (formik) => <RentClientForm props={formik} />,
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
            return !!vehicle?.id;
          }

          if (step >= 1) {
            const errors = await formik.validateForm(formik.values);
            return Object.keys(errors).length === 0;
          }

          return false;
        }}
        onCancel={() => history.push(Routes.rents())}
        onSubmit={async (values, actions) => {
          await submitRent(values, actions);
          history.push(Routes.rents());
        }}
      />
    </Container>
  );
};

async function submitRent(
  values: RentFormValues,
  actions: FormikHelpers<RentFormValues>
) {
  const rent = await Services.rents.create({
    name: values.name,
    email: values.email,
    creditCard: values.creditCard,
    creditLimit: values.creditLimit!,
    documentId: values.documentId,
    legalPerson: values.legalPerson,
    employeeId: values.employeeId,
    vehicleId: values.vehicleId,
    comments: values.comments!,
  });

  const inspection = await Services.inspections.create({
    rentId: rent.id,
    haveBrokenGlass: values.haveBrokenGlass,
    haveCarJack: values.haveCarJack,
    haveScratches: values.haveScratches,
    haveTires: values.haveTires,
    frontLeftTire: values.frontLeftTire,
    frontRightTire: values.frontRightTire,
    backLeftTire: values.backLeftTire,
    backRightTire: values.backRightTire,
    status: values.status!,
  });

  console.log(rent, inspection);

  actions.setSubmitting(false);
}
