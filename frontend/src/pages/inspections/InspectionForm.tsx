import { InspectionDTO, TireStatus } from "@shared/types";
import { FormikErrors, FormikTouched } from "formik";
import { FormInput, FormCheckbox, Row, FormSelect } from "src/components";

export interface InspectionFormProps {
  initialValues: Partial<InspectionDTO>;
  errors: FormikErrors<Partial<InspectionDTO>>;
  touched: FormikTouched<Partial<InspectionDTO>>;
}

export function InspectionForm({
  initialValues,
  errors,
  touched,
}: InspectionFormProps) {
  return (
    <>
      {initialValues.id && (
        <FormInput label="Inspection ID" name="id" readOnly />
      )}
      {initialValues.inspectionDate && (
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
        error={errors.haveScratches!}
        touched={touched.haveScratches!}
      />
      <FormCheckbox
        label="Have Broken Glass"
        name="haveBrokenGlass"
        error={errors.haveBrokenGlass!}
        touched={touched.haveBrokenGlass!}
      />
      <FormCheckbox
        label="Have CarJack"
        name="haveCarJack"
        error={errors.haveCarJack!}
        touched={touched.haveCarJack!}
      />
      <FormCheckbox
        label="Have Tires"
        name="haveTires"
        error={errors.haveTires!}
        touched={touched.haveTires!}
      />

      <Row>
        <FormSelect
          label="Front left tire"
          name="frontLeftTire"
          options={TireStatus}
          error={errors.frontLeftTire}
          touched={touched.frontLeftTire}
        />

        <FormSelect
          label="Front right tire"
          name="frontRightTire"
          options={TireStatus}
          error={errors.frontRightTire}
          touched={touched.frontRightTire}
        />

        <FormSelect
          label="Back left tire"
          name="backLeftTire"
          options={TireStatus}
          error={errors.backLeftTire}
          touched={touched.backLeftTire}
        />

        <FormSelect
          label="Back right tire"
          name="backRightTire"
          options={TireStatus}
          error={errors.backRightTire}
          touched={touched.backRightTire}
        />
      </Row>

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
