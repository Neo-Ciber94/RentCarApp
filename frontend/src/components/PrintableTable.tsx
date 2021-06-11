import React from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { CSSDataTableStyles } from "./CSSDataTableStyles";

interface PrintableTableProps<T = any> {
  display?: boolean;
  data: T[];
  columns: IDataTableColumn<T>[];
}

const customStyles: CSSDataTableStyles = {
  cells: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderLeft: "0.5px solid rgba(0, 0, 0, 0.1)",
      borderRight: "0.5px solid rgba(0, 0, 0, 0.1)",
      borderCollapse: "collapse",
    },
  },
  headCells: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderCollapse: "collapse",
    },
  },
};

export const PrintDataTable = React.forwardRef<
  HTMLDivElement,
  PrintableTableProps
>(({ display = false, columns, data }, ref) => {
  const printDate = new Date().toLocaleString();

  columns = columns.map((c) => {
    c.wrap = true;
    return c;
  });

  return (
    <div className={display ? "" : "hidden"}>
      <div ref={ref} className="p-4 flex flex-col h-full">
        <h1 id="logo" className="mb-2 text-3xl font-bold">
          RentCar
        </h1>
        <p className="text-xs font-light">{printDate}</p>
        <div className="mb-auto">
          <DataTable
            customStyles={customStyles}
            data={data}
            columns={columns}
            pagination={false}
            dense
            striped
          />
        </div>

        <div className="flex flex-row justify-end">
          <p className="text-xs font-light">{printDate}</p>
        </div>
      </div>
    </div>
  );
});
