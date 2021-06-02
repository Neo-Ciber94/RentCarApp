import { CREDIT_CARD_LENGTH, DOCUMENT_ID_LENGTH } from "@shared/config";
import { LegalPerson } from "@shared/types";
import { randomString } from "src/utils/randomString";
import { RentForm } from "./RentForm";

export function RentCreate() {
  return (
    <RentForm
      initialValues={{
        id: 0,
        name: "",
        email: "",
        vehicleId: 0,
        creditLimit: undefined,
        creditCard: randomString(CREDIT_CARD_LENGTH),
        documentId: randomString(DOCUMENT_ID_LENGTH),
        legalPerson: LegalPerson.Physical,
      }}
    />
  );
}
