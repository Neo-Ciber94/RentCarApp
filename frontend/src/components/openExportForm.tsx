import { openSwalForm } from ".";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

export interface OnExportOptions {
  formDate?: Date;
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
    onSubmit: (values, actions) => {
      console.log("Exporting: ", values);
      config.onExport(values.format as K, {
        formDate: values.fromDate,
        toDate: values.toDate,
      });

      actions.close();
    },
    render: () => {
      const formats = config.formats.map((f) => ({
        label: f,
        value: f,
      }));

      if (config.dateRange) {
        return (
          <>
            <FormSelect label="Export Type" options={formats} />
            <FormInput label="From Date" name="fromDate" type="date" />
            <FormInput label="To Date" name="toDate" type="date" />
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

type ExportDataConfig<T> = {
  selectDate: (value: T) => [Date, Date];
  fromDate?: Date;
  toDate?: Date;
};

function getExportData<T>(data: T[], config?: ExportDataConfig<T>) {
  if (config) {
    const fromDate = config.fromDate;
    const toDate = config.toDate;

    if (fromDate == null && toDate == null) {
      return data;
    }

    const result: T[] = [];

    for (const obj of data) {
      const [start, end] = config.selectDate(obj);

      if (fromDate && toDate) {
        if (start >= fromDate && toDate <= end) {
          result.push(obj);
        }
      } else if (fromDate == null) {
        if (end <= toDate!) {
          result.push(obj);
        }
      } else if (toDate == null) {
        if (start >= fromDate) {
          result.push(obj);
        }
      }
    }

    return result;
  }

  return data;
}
