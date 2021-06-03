import { InspectionDTO, TireStatus } from "@shared/types";
import { useHistory } from "react-router-dom";
import { withCustomForm } from "src/components";
import * as yup from "yup";

type InspectionEntity = Omit<
  PartialBy<InspectionDTO, "id">,
  "client" | "vehicle"
>;
export interface InspectionFormProps {
  initialValues: InspectionEntity;
}

const validationSchema: yup.SchemaOf<InspectionEntity> = yup.object({
  id: yup.number().optional(),

  clientId: yup
    .number()
    .min(1, "Client is required")
    .required("Client is required"),

  haveBrokenGlass: yup.bool().optional().default(false),

  haveCarJack: yup.bool().optional().default(false),

  haveScratches: yup.bool().optional().default(false),

  haveTires: yup.bool().optional().default(false),

  status: yup.string().optional(),

  vehicleId: yup
    .number()
    .min(1, "Vehicle is required")
    .required("Vehicle Id is required"),

  tireStatus: yup
    .mixed<TireStatus>()
    .oneOf(Object.values(TireStatus))
    .required("Tire status is required"),

  // Date type is giving an error: https://github.com/jquense/yup/issues/1183
  inspectionDate: yup.date().required("Inspection date is required") as any,
});

export function InspectionForm({ initialValues }: InspectionFormProps) {
  const history = useHistory();

  return withCustomForm({
    initialValues,
    validationSchema,
    onCancel: () => history.goBack(),
    onSubmit: (values, actions) => {
      console.log(values);
    },
    render: ({ errors, touched }) => {
      return <h1>Hello World</h1>;
    },
  });
}
