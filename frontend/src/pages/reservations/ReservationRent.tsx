import { InspectionDTO, RentFromReservation, TireStatus } from "@shared/types";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useHistory, useParams } from "react-router";
import { Container, FormStep, Loading, MultiStepForm } from "src/components";
import { AuthContext } from "src/context/AuthContext";
import { useReservation } from "src/hooks/reservationHooks";
import { Routes } from "src/layout";
import { Services } from "src/services";
import { InspectionForm } from "../inspections";
import { inspectionValidationSchema } from "../rents";
import { ReservationInfo } from "./ReservationInfo";

interface ReservationRentValues
  extends Omit<InspectionDTO, "id" | "rentId" | "rent" | "inspectionDate">,
    RentFromReservation {}

export const ReservationRent = observer(() => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { isLoading, data } = useReservation(Number(params.id));
  const authService = useContext(AuthContext);
  const user = authService.currentUser!;

  if (isLoading || data == null) {
    return <Loading />;
  }

  const initialValues: ReservationRentValues = {
    employeeId: user.id,
    haveBrokenGlass: false,
    haveCarJack: false,
    haveScratches: false,
    haveTires: false,
    reservationId: data.id,
    comments: "",
    status: "",
    backLeftTire: TireStatus.Normal,
    backRightTire: TireStatus.Normal,
    frontLeftTire: TireStatus.Normal,
    frontRightTire: TireStatus.Normal,
  };
  const steps: FormStep<ReservationRentValues>[] = [
    {
      label: "Reservation",
      render: () => <ReservationInfo reservation={data} />,
    },

    {
      label: "Inspection",
      validationSchema: inspectionValidationSchema,
      render: ({ errors, touched }) => (
        <InspectionForm
          initialValues={initialValues}
          errors={errors}
          touched={touched}
        />
      ),
    },
  ];

  return (
    <Container className="lg:max-w-5xl">
      <MultiStepForm
        initialValues={initialValues}
        steps={steps}
        onSubmit={async (values, actions) => {
          // Creates the reservation
          const newRent = await Services.rents.fromReservation(values);

          // Creates an inspection for the reservation
          await Services.inspections.create({
            ...values,
            rentId: newRent.id,
          });

          actions.setSubmitting(false);
          history.push(Routes.reservations.path);
        }}
      />
    </Container>
  );
});
