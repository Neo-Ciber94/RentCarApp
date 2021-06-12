import { IDataTableColumn } from "react-data-table-component";
import { openSwalForm } from ".";
import { FormSelect } from "./FormSelect";

export enum ExportType {
  PDF = "pdf",
  CSV = "csv",
}

export interface ExportDefault {
  exportType: ExportType;
}

export interface ExportRange {
  exportType: ExportType;
  fromDate?: Date;
  toDate?: Date;
}

export interface ExportDefaultConfig<T> {
  data: T[];
  columns: IDataTableColumn<T>[];
  options: ExportDefault;
}

export interface ExportRangeConfig<T> {
  data: T[];
  columns: IDataTableColumn<T>[];
  options: ExportRange;
  selectDate: (value: T) => [Date, Date | undefined];
}

export function useExportSwal<T = any>(config: ExportDefaultConfig<T>) {
  return openSwalForm<ExportDefault>({
    title: "Export Data",
    submitButtonText: "Export",
    initialValues: {
      exportType: ExportType.CSV,
    },
    onSubmit: (values, actions) => {
      switch (values.exportType) {
        case ExportType.CSV:
          {
          }
          break;
        case ExportType.PDF:
          break;
      }
      console.log("Exporting: ", values);
      actions.close();
    },
    render: () => <FormSelect label="Export Type" options={ExportType} />,
  });
}

export function useExportRangeSwal<T = any>(config: ExportRangeConfig<T>) {
  return openSwalForm<ExportRange>({
    title: "Export Data",
    submitButtonText: "Export",
    initialValues: {
      exportType: ExportType.CSV,
      // Formik do not allow undefined or null
      fromDate: "" as any,
      toDate: "" as any,
    },
    onSubmit: (values, actions) => {
      console.log("Exporting: ", values);
      actions.close();
    },
    render: () => <FormSelect label="Export Type" options={ExportType} />,
  });
}
