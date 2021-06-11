import { RentDTO } from "@shared/types";
import React from "react";
import { IDataTableColumn } from "react-data-table-component";
import { PrintableTable } from "src/components";

interface RentPrintProps<T> {
  ref: any;
  data: T[];
}

const printColumns: IDataTableColumn<RentDTO>[] = [
  {
    name: "Vehicle (ID)",
    selector: (e) =>
      `${e.vehicle.model.brand.name} ${e.vehicle.model.name} (${e.vehicleId})`,
  },
  {
    name: "Employee",
    selector: (e) => `${e.employee.user.firstName} ${e.employee.user.lastName}`,
  },

  {
    name: "Client",
    selector: (e) => `${e.client.name}`,
  },

  {
    name: "Rent Date",
    selector: (e) => (
      <p className="whitespace-nowrap">
        {new Date(e.rentDate).toLocaleDateString()}
      </p>
    ),
    compact: true,
    grow: 0,
  },

  {
    name: "Total Days",
    selector: (e) => e.totalDays,
    compact: true,
    grow: 0,
  },

  {
    name: "Total Price",
    selector: (e) => `${e.totalPrice} RD$`,
    compact: true,
    grow: 0,
  },
];

export function RentPrint<T>({ data, ref }: RentPrintProps<T>) {
  return <PrintableTable ref={ref} data={data} columns={printColumns} />;
}
