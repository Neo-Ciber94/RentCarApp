import { CREDIT_CARD_LENGTH, DOCUMENT_ID_LENGTH } from "@shared/config";
import { LegalPerson } from "@shared/types";
import { useParams } from "react-router";
import { Loading } from "src/components";
import { useReservation } from "src/hooks/reservationHooks";
import { Services } from "src/services";
import { RandomString } from "src/utils/RandomString";
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
    vehicleId: reservation.vehicleId,
    creditLimit: 0,
    creditCard: RandomString.number(CREDIT_CARD_LENGTH),
    documentId: RandomString.number(DOCUMENT_ID_LENGTH),
    legalPerson: LegalPerson.Physical,
    reservationDate: new Date(new Date().toDateString()),
  };

  return <ReservationForm initialValues={initialValues} />;
}
