import { useParams } from "react-router";
import { Loading } from "src/components";
import { useReservation } from "src/hooks/reservationHooks";
import { ReservationForm, ReservationValues } from "./ReservationForm";

export function ReservationEdit() {
  const params = useParams<{ id: string }>();
  const { isLoading, data: reservation } = useReservation(Number(params.id));

  if (isLoading || reservation == null) {
    return <Loading />;
  }
  const initialValues: ReservationValues = {
    name: reservation.client.name,
    email: reservation.client.email,
    creditLimit: reservation.client.creditLimit,
    creditCard: reservation.client.creditCard,
    vehicleId: reservation.vehicleId,
    documentId: reservation.client.documentId,
    legalPerson: reservation.client.legalPerson,
    reservationDate: reservation.reservationDate,
  };

  return <ReservationForm initialValues={initialValues} />;
}
