import { CREDIT_CARD_LENGTH, DOCUMENT_ID_LENGTH } from "@shared/config";
import { ClientDTO, LegalPerson } from "@shared/types";
import * as yup from "yup";
import { ReservationValues } from "./ReservationForm";

export const reservationValidationSchemas = {
  // Vehicle
  vehicle: yup.object({
    vehicleId: yup
      .number()
      .min(1, "Select a vehicle")
      .required("Select a vehicle"),
  }) as yup.SchemaOf<Pick<ReservationValues, "vehicleId">>,

  // Client
  client: yup.object({
    name: yup.string().required("Name is required"),

    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),

    creditCard: yup
      .string()
      .length(
        CREDIT_CARD_LENGTH,
        `Invalid credit card length, expected ${CREDIT_CARD_LENGTH} digits`
      )
      .required("Credit card is required"),

    creditLimit: yup.number().min(0).required("Credit limit is required"),

    documentId: yup
      .string()
      .length(DOCUMENT_ID_LENGTH)
      .required(
        `Invalid document id length, expected ${DOCUMENT_ID_LENGTH} digits`
      ),

    legalPerson: yup
      .mixed<LegalPerson>()
      .oneOf(Object.values(LegalPerson))
      .required("Legal person is required"),
  }) as yup.SchemaOf<Omit<ClientDTO, "id">>,

  // Reservation
  reservation: yup.object({
    reservationDate: yup
      .date()
      .min(new Date(), `The date must be after ${new Date()}`)
      .required("Date is required") as any,
  }) as yup.SchemaOf<{ reservationDate: Date }>,
};
