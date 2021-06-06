import { ClientDTO, LegalPerson, VehicleDTO } from "@shared/types";
import { useState } from "react";
import { Container, FormStep, MultiStepForm } from "src/components";
import { RentVehicleSelection } from "../rents";
import { reservationValidationSchemas } from "./reservationValidationSchemas";
import { FormInput, FormSelect } from "src/components";
import { FormikProps } from "formik";

export interface ReservationValues extends Omit<ClientDTO, "id"> {
  // Vehicle
  vehicleId: number;

  // Client
  clientId?: number;

  // Reservation
  reservationDate: Date;
}

export function ReservationClient() {
  const [vehicle, setVehicle] = useState<VehicleDTO>();
  const initialValues: ReservationValues = {
    vehicleId: 0,
    creditCard: "",
    creditLimit: 0,
    documentId: "",
    email: "",
    legalPerson: LegalPerson.Physical,
    name: "",
    reservationDate: new Date(),
  };

  const steps: FormStep<ReservationValues>[] = [
    {
      label: "Vehicle",
      validationSchema: reservationValidationSchemas.vehicle,
      render: ({ errors, setFieldValue }) => (
        <RentVehicleSelection
          selected={vehicle}
          onSelect={(v) => {
            setVehicle(v);
            setFieldValue("vehicleId", v.id);
          }}
          error={errors.vehicleId}
        />
      ),
    },

    {
      label: "Client",
      validationSchema: reservationValidationSchemas.client,
      render: (formik) => <ClientForm formik={formik} />,
    },

    {
      label: "Reservation Date",
      validationSchema: reservationValidationSchemas.reservation,
      render: (formik) => <ReservationForm formik={formik} />,
    },
  ];

  return (
    <Container>
      <MultiStepForm
        initialValues={initialValues}
        steps={steps}
        onNext={(step, values) => {
          console.log(values);
        }}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      />
    </Container>
  );
}

function ClientForm(props: { formik: FormikProps<ReservationValues> }) {
  const { errors, values, touched } = props.formik;

  return (
    <>
      {values.clientId && (
        <FormInput label="Client ID" name="clientId" readOnly />
      )}
      <FormInput
        label="Name"
        name="name"
        error={errors.name}
        touched={touched.name}
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        error={errors.email}
        touched={touched.email}
      />
      <FormInput
        label="Document ID"
        name="documentId"
        error={errors.documentId}
        touched={touched.documentId}
      />
      <FormInput
        label="Credit Card"
        name="creditCard"
        error={errors.creditCard}
        touched={touched.creditCard}
      />
      <FormInput
        label="Credit Limit"
        name="creditLimit"
        type="number"
        error={errors.creditLimit}
        touched={touched.creditLimit}
      />
      <FormSelect
        label="Legal Person"
        name="legalPerson"
        options={LegalPerson}
        error={errors.legalPerson}
        touched={touched.legalPerson}
      />
    </>
  );
}

function ReservationForm(props: { formik: FormikProps<ReservationValues> }) {
  const { errors, touched } = props.formik;

  return (
    <>
      <FormInput
        label="Reservation Date"
        name="reservationDate"
        type="datetime"
        error={errors.reservationDate + ""}
        touched={touched.reservationDate ? true : false}
      />
    </>
  );
}
