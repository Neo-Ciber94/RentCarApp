import { RentDTO } from "@shared/types";
import React from "react";
import { IDataTableColumn } from "react-data-table-component";
import {
  Container,
  FormInput,
  FormSelect,
  Loading,
  LoadingScreen,
  openExportForm,
  openSwalForm,
  withCrudDataTable,
} from "src/components";
import { usePrintableTable } from "src/context/PrintDataTableContext";
import { useAllRents } from "src/hooks/rentHooks";
import { convertToCSV } from "src/utils/convertToCSV";
import { Download } from "src/utils/downloads";
import { dateTimeStamp, timeStamp } from "src/utils/timeStamp";

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
    selector: (e) => e.totalDays?.toFixed(2),
    compact: true,
    grow: 0,
  },

  {
    name: "Total Price",
    selector: (e) => `${e.totalPrice?.toLocaleString()} RD$`,
    compact: true,
    grow: 0,
  },
];

export function Rents() {
  const printable = usePrintableTable();
  const { isLoading, data = [] } = useAllRents();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="lg:max-w-6xl">
      {printable.isPrinting && <LoadingScreen />}
      {withCrudDataTable({
        columns,
        data,
        actionButtons: [
          {
            text: "Export",
            onClick: () => {
              openExportForm({
                formats: ["csv", "pdf"],
                dateRange: true,
                onExport: (format, options) => {
                  // Report on the completed rents
                  const reportRents = data.filter((e) => e.returnDate != null);

                  switch (format) {
                    case "csv":
                      {
                        const csv = convertToCSV<RentDTO>({
                          data: reportRents,
                          columns: printColumns.map((c) => ({
                            name: c.name!.toString() as keyof RentDTO,
                            selector: (value, index) => {
                              if (typeof c.selector === "string") {
                                return c.selector;
                              } else {
                                return c.selector!(value, index)!.toString();
                              }
                            },
                          })),
                        });

                        Download.csv(`rents-${dateTimeStamp()}.csv`, csv);
                      }
                      break;
                    case "pdf":
                      {
                        printable.print({
                          documentTitle: `rents-${new Date().toLocaleDateString()}-${timeStamp()}`,
                          columns: printColumns,
                          data,
                        });
                      }
                      break;
                  }

                  console.log(format, options);
                },
              });
            },
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
