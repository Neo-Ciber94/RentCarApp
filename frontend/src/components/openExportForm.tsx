import { FormikErrors } from "formik";
import { openSwalForm } from ".";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

export interface OnExportOptions {
  fromDate?: Date;
  toDate?: Date;
}

export interface ExportFormValues {
  format: string;
  fromDate?: Date;
  toDate?: Date;
}

export interface ExportConfig<K extends string> {
  formats: readonly K[];
  dateRange?: boolean;
  onExport: (format: K, options?: OnExportOptions) => void;
}

export function openExportForm<K extends string>(config: ExportConfig<K>) {
  if (config.formats.length === 0) {
    throw new Error(`Required at least 1 export option`);
  }

  return openSwalForm<ExportFormValues>({
    title: "Export Data",
    submitButtonText: "Export",
    initialValues: {
      format: config.formats[0],
      fromDate: "" as any,
      toDate: "" as any,
    },
    validate: (values) => {
      const errors: FormikErrors<ExportFormValues> = {};

      if (values.fromDate && values.toDate) {
        const from = new Date(values.fromDate);
        const to = new Date(values.toDate);

        if (to < from) {
          errors.toDate = `"To Date" cannot be lower than "From Date"`;
        }
      }

      return errors;
    },
    onSubmit: (values, actions) => {
      console.log("Exporting: ", values);
      config.onExport(values.format as K, {
        fromDate: values.fromDate,
        toDate: values.toDate,
      });

      actions.close();
    },
    render: ({ errors, touched }) => {
      const formats = config.formats.map((f) => ({
        label: f,
        value: f,
      }));

      if (config.dateRange) {
        return (
          <>
            <FormSelect
              label="Export Type"
              options={formats}
              name="format"
              error={errors.format}
              touched={touched.format}
            />
            <FormInput
              label="From Date"
              name="fromDate"
              type="date"
              error={errors.fromDate}
              touched={touched.fromDate}
            />
            <FormInput
              label="To Date"
              name="toDate"
              type="date"
              error={errors.toDate}
              touched={touched.toDate}
            />
          </>
        );
      } else {
        return (
          <FormSelect label="Export Type" name="format" options={formats} />
        );
      }
    },
  });
}
