import { InspectionDTO, TireStatus } from "@shared/types";
import * as yup from "yup";

interface InspectionValues extends PartialBy<InspectionDTO, "id"> {}

const validationSchema: yup.SchemaOf<InspectionValues> = yup.object({
  id: yup.number().optional(),

  clientId: yup
    .number()
    .min(1, "Client is required")
    .required("Client is required"),

  haveBrokenGlass: yup.bool().required("Required"),

  haveCarJack: yup.bool().required("Required"),

  haveScratches: yup.bool().required("Required"),

  haveTires: yup.bool().required("Is Required"),

  status: yup.string().optional(),

  vehicleId: yup
    .number()
    .min(1, "Vehicle is required")
    .required("Vehicle Id is required"),

  tireStatus: yup
    .mixed<TireStatus>()
    .oneOf(Object.values(TireStatus))
    .required("Tire status is required"),

  // Known bug: https://github.com/jquense/yup/issues/1183
  inspectionDate: yup.date().required("Inspection date is required") as any,

  // Ignored fields
  client: yup.mixed().optional(),

  vehicle: yup.mixed().optional(),
});

export function InspectionForm() {}
