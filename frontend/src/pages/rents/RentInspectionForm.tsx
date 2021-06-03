import { TireStatus } from "@shared/types";
import { FormikErrors, FormikTouched } from "formik";
import { FormInput, FormSelect } from "src/components";
import { FormCheckbox } from "src/components/FormCheckbox";
import { RentValues } from "./RentForm";

interface InspectionProps {
  errors: FormikErrors<RentValues>;
  touched: FormikTouched<RentValues>;
}

export function RentInspectionForm({ errors, touched }: InspectionProps) {
  return (
    <>
      {/* <FormInput label="ID" name="id" /> */}
      {/* <FormInput label="Inspection Date" name="inspectionDate" type="date" /> */}
      <FormCheckbox
        label="Have Scratches"
        name="haveScratches"
        options={["None", "Some", "A lot"]}
      />
      <FormCheckbox label="Have Broken Glass" name="haveBrokenGlass" />
      <FormCheckbox label="Have CarJack" name="haveCarJack" />
      <FormCheckbox label="Have Tires" name="haveTires" />
      <FormSelect label="Tire Status" name="tireStatus" options={TireStatus} />
      <FormInput label="Status" name="status" as="textarea" />
    </>
  );
}
