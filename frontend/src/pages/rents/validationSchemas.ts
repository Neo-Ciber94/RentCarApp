import { CREDIT_CARD_LENGTH, DOCUMENT_ID_LENGTH } from "@shared/config";
import { LegalPerson, TireStatus } from "@shared/types";
import * as yup from "yup";
import {
  RentClientValues,
  RentInspectionValues,
  RentValues,
} from "./RentFormValues";

export const rentValidationSchema: yup.SchemaOf<RentValues & RentClientValues> =
  yup.object({
    rentId: yup.number().optional(),

    name: yup.string().required("Name is required"),

    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),

    creditCard: yup
      .string()
      .required("Credit Card is required")
      .length(
        CREDIT_CARD_LENGTH,
        `Credit card expect ${CREDIT_CARD_LENGTH} digits`
      ),

    creditLimit: yup
      .number()
      .optional()
      .min(1000, "Min credit limit is 1000 RD$"),

    documentId: yup
      .string()
      .required("Document ID is required")
      .length(
        DOCUMENT_ID_LENGTH,
        `Document ID expected ${DOCUMENT_ID_LENGTH} digits`
      ),

    legalPerson: yup
      .mixed<LegalPerson>()
      .oneOf(Object.values(LegalPerson))
      .required("Legal Person type is required"),

    vehicleId: yup
      .number()
      .min(1, "Select a vehicle")
      .required("Vehicle is required"),

    comments: yup.string().optional(),

    employeeId: yup.number().required("Employee is required"),

    rentDate: yup.date().optional() as any,

    returnDate: yup.date().optional() as any,

    totalDays: yup.number().optional(),

    totalPrice: yup.number().optional(),

    // Ignored
    clientId: yup.number().optional(),
  });

export const inspectionValidationSchema: yup.SchemaOf<RentInspectionValues> =
  yup.object({
    inspectionId: yup.number().optional(),

    haveBrokenGlass: yup.bool().default(false),

    haveCarJack: yup.bool().default(false),

    haveScratches: yup.bool().default(false),

    haveTires: yup.bool().default(false),

    status: yup.string().optional(),

    inspectionDate: yup.date().optional() as any,

    frontLeftTire: yup
      .mixed<TireStatus>()
      .oneOf(Object.values(TireStatus))
      .required("Front left tire status is required"),

    frontRightTire: yup
      .mixed<TireStatus>()
      .oneOf(Object.values(TireStatus))
      .required("Front right tire status is required"),

    backLeftTire: yup
      .mixed<TireStatus>()
      .oneOf(Object.values(TireStatus))
      .required("Back left tire status is required"),

    backRightTire: yup
      .mixed<TireStatus>()
      .oneOf(Object.values(TireStatus))
      .required("Back right tire status is required"),
  });
