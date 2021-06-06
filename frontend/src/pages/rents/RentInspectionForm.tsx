import { TireStatus } from "@shared/types";
import { FormikErrors, FormikTouched } from "formik";
import { FormInput, FormSelect } from "src/components";
import { FormCheckbox } from "src/components/FormCheckbox";
import { RentFormValues } from ".";

interface InspectionProps {
  values: RentFormValues;
  errors: FormikErrors<RentFormValues>;
  touched: FormikTouched<RentFormValues>;
}

export function RentInspectionForm({
  errors,
  touched,
  values,
}: InspectionProps) {
  return (
    <>
      {values.inspectionId && (
        <FormInput label="Inspection ID" name="inspectionId" readOnly />
      )}
      {values.inspectionDate && (
        <FormInput
          label="Inspection Date"
          name="inspectionDate"
          type="date"
          readOnly
        />
      )}
      <FormCheckbox
        label="Have Scratches"
        name="haveScratches"
        error={errors.haveScratches}
        touched={touched.haveScratches}
      />
      <FormCheckbox
        label="Have Broken Glass"
        name="haveBrokenGlass"
        error={errors.haveBrokenGlass}
        touched={touched.haveBrokenGlass}
      />
      <FormCheckbox
        label="Have CarJack"
        name="haveCarJack"
        error={errors.haveCarJack}
        touched={touched.haveCarJack}
      />
      <FormCheckbox
        label="Have Tires"
        name="haveTires"
        error={errors.haveTires}
        touched={touched.haveTires}
      />

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-between">
        <FormSelect
          label="Front Left Tire"
          name="frontLeftTire"
          options={TireStatus}
          error={errors.frontLeftTire}
          touched={touched.frontLeftTire}
        />

        <FormSelect
          label="Front Right Tire"
          name="frontRightTire"
          options={TireStatus}
          error={errors.frontRightTire}
          touched={touched.frontRightTire}
        />

        <FormSelect
          label="Back Left Tire"
          name="backLeftTire"
          options={TireStatus}
          error={errors.backLeftTire}
          touched={touched.backLeftTire}
        />

        <FormSelect
          label="Back Right Tire"
          name="backRightTire"
          options={TireStatus}
          error={errors.backRightTire}
          touched={touched.backRightTire}
        />
      </div>

      <FormInput
        label="Status"
        name="status"
        as="textarea"
        error={errors.status}
        touched={touched.status}
      />
    </>
  );
}
