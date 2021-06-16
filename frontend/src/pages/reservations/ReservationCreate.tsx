import { CREDIT_CARD_LENGTH, DOCUMENT_ID_LENGTH } from "@shared/config";
import { LegalPerson } from "@shared/types";
import { RandomString } from "src/utils/RandomString";
import { ReservationForm, ReservationValues } from "./ReservationForm";
import dayjs from "dayjs";

export function ReservationCreate() {
  const initialValues: ReservationValues = {
    name: "",
    email: "",
    vehicleId: 0,
    creditLimit: 0,
    creditCard: RandomString.number(CREDIT_CARD_LENGTH),
    documentId: RandomString.number(DOCUMENT_ID_LENGTH),
    legalPerson: LegalPerson.Physical,
    reservationDate: dayjs().format("YYYY-MM-DD") as unknown as Date,
  };

  return <ReservationForm initialValues={initialValues} />;
}
