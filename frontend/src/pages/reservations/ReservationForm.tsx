import { ClientDTO, LegalPerson, VehicleDTO } from "@shared/types";
import { useContext, useState } from "react";
import { Container, FormStep, MultiStepForm } from "src/components";
import { RentVehicleSelection } from "../rents";
import { reservationValidationSchemas } from "./reservationValidationSchemas";
import { FormInput, FormSelect } from "src/components";
import { FormikProps } from "formik";
import { Services } from "src/services";
import { useHistory } from "react-router";
import { AuthContext } from "src/context/AuthContext";
import { observer } from "mobx-react-lite";
import Routes from "src/routes/Routes";

export interface ReservationValues extends Omit<ClientDTO, "id"> {
  reservationId?: number;

  // Vehicle
  vehicleId: number;

  // Client
  clientId?: number;

  // Reservation
  reservationDate: Date;
}

export interface ReservationFormProps {
  initialValues: ReservationValues;
}

export const ReservationForm = observer<ReservationFormProps>(
  ({ initialValues }) => {
    const history = useHistory();
    const [vehicle, setVehicle] = useState<VehicleDTO>();
    const authService = useContext(AuthContext);

    const steps: FormStep<ReservationValues>[] = [
      {
        label: "Vehicle",
        validationSchema: reservationValidationSchemas.vehicle,
        render: ({ errors, setFieldValue }) => (
          <RentVehicleSelection
            selectedId={vehicle?.id || initialValues.vehicleId}
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
        render: (formik) => <ReservationDateForm formik={formik} />,
      },
    ];

    return (
      <Container className="lg:w-4/6 md:w-5/6">
        <MultiStepForm
          initialValues={initialValues}
          steps={steps}
          onCancel={() => history.push(Routes.reservations())}
          onSubmit={async (values, actions) => {
            console.log(values);
            // Updates
            if (values.reservationId) {
              await Services.clients.update({
                id: values.clientId,
                name: values.name,
                creditCard: values.creditCard,
                creditLimit: values.creditLimit,
                documentId: values.documentId,
                email: values.email,
                legalPerson: values.legalPerson,
              });

              await Services.reservations.update({
                id: values.reservationId,
                vehicleId: values.vehicleId,
                reservationDate: values.reservationDate,
              });
            }
            // Creates
            else {
              const client = await Services.clients.create({
                name: values.name,
                creditCard: values.creditCard,
                creditLimit: values.creditLimit,
                documentId: values.documentId,
                email: values.email,
                legalPerson: values.legalPerson,
              });

              await Services.reservations.create({
                clientId: client.id,
                vehicleId: values.vehicleId,
                reservationDate: values.reservationDate,
              });
            }

            actions.setSubmitting(false);
            if (authService.isAuthenticated) {
              history.push(Routes.reservations());
            } else {
              history.push("/");
            }
          }}
        />
      </Container>
    );
  }
);

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

function ReservationDateForm(props: {
  formik: FormikProps<ReservationValues>;
}) {
  const { errors, touched } = props.formik;

  return (
    <>
      <FormInput
        label="Reservation Date"
        name="reservationDate"
        type="date"
        error={errors.reservationDate as any}
        touched={touched.reservationDate as any}
      />
    </>
  );
}
