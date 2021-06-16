import { RentDTO } from "@shared/types";
import { IDataTableColumn } from "react-data-table-component";
import {
  Container,
  Loading,
  LoadingScreen,
  openExportForm,
  withCrudDataTable,
} from "src/components";
import { usePrintableTable } from "src/context/PrintDataTableContext";
import { useAllRents } from "src/hooks/rentHooks";
import Routes from "src/routes/Routes";
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
    name: "Client",
    selector: (e) => `${e.client.name}`,
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
    selector: (e) => new Date(e.rentDate).toLocaleDateString(),
    compact: true,
    grow: 0,
  },
  {
    name: "Return Date",
    selector: (e) => new Date(e.returnDate!).toLocaleDateString(),
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
                  const reportRents = getExportRents(
                    data,
                    options?.fromDate,
                    options?.toDate
                  );

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
                      printable.print({
                        documentTitle: `rents-${new Date().toLocaleDateString()}-${timeStamp()}`,
                        columns: printColumns,
                        data: reportRents,
                      });
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
        addPath: Routes.rents("new"),
        detailsPath: (row) => Routes.rents(row.id),
        editPath: (row) => Routes.rents(row.id, "edit"),
        canEdit: (row) => row.returnDate == null,
        canDelete: false,
      })}
    </Container>
  );
}

function getExportRents(rents: RentDTO[], from?: Date, to?: Date) {
  // Only include returned rents
  let result = rents.filter((e) => e.returnDate != null);

  if (from) {
    result = result.filter((e) => {
      console.log(`(${e.id}) ${e.rentDate} >= ${from} = ${e.rentDate >= from}`);
      return e.rentDate >= from;
    });
  }

  if (to) {
    result = result.filter((e) => new Date(e.rentDate!) <= new Date(to));
  }

  console.log(result, new Date(from!), new Date(to!));
  return result;
}
