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

export function InspectionForm({ initialValues }: InspectionFormProps) {
  const history = useHistory();

  return withCustomForm({
    initialValues,
    onCancel: () => history.goBack(),
    onSubmit: (values, actions) => {
      console.log(values);
    },
    render: ({ errors, touched }) => {
      return <h1>Hello World</h1>;
    },
  });
}
