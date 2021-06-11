import { RentDTO } from "@shared/types";
import { useRef } from "react";
import { IDataTableColumn } from "react-data-table-component";
import { useReactToPrint } from "react-to-print";
import {
  Container,
  Loading,
  PrintableTable,
  withCrudDataTable,
} from "src/components";
import { useAllRents } from "src/hooks/rentHooks";

const columns: IDataTableColumn<RentDTO>[] = [
  {
    name: "ID",
    selector: (e) => e.id,
  },

  {
    name: "Vehicle",
    selector: (e) => `${e.vehicle.model.brand.name} ${e.vehicle.model.name}`,
  },

  {
    name: "Employee",
    selector: (e) => `${e.employee.user.firstName} ${e.employee.user.lastName}`,
  },

  {
    name: "Rent Date",
    selector: (e) => new Date(e.rentDate).toLocaleString(),
  },

  {
    name: "Status",
    cell: (row) => (
      <p className={`${row.returnDate ? "text-green-600" : "text-red-600"}`}>
        {row.returnDate ? "Returned" : "Rented"}
      </p>
    ),
  },
];

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

export function Rents() {
  const { isLoading, data = [] } = useAllRents();
  const componentRef: any = useRef(null);

  const print = useReactToPrint({
    documentTitle: `rents-${new Date().toLocaleDateString()}-${Math.floor(
      Date.now() / 1000
    )}`,
    content: () => componentRef.current,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="lg:max-w-6xl">
      <div className="hidden">
        <PrintableTable ref={componentRef} data={data} columns={printColumns} />
      </div>
      {withCrudDataTable({
        columns,
        data,
        actionButtons: [
          {
            text: "Export PDF",
            onClick: () => print!(),
          },
        ],
        sortable: true,
        addButtonText: "Rent Vehicle",
        addPath: "/rents/new",
        editPath: (row) => `/rents/${row.id}/edit`,
        detailsPath: (row) => `/rents/${row.id}`,
        canEdit: (row) => row.returnDate == null,
        canDelete: false,
      })}
    </Container>
  );
}
