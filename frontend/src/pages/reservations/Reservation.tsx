import { ReservationDTO, ReservationStatus } from "@shared/types";
import { IDataTableColumn } from "react-data-table-component";
import {
  Container,
  CustomDataTable,
  Loading,
  withCrudDataTable,
} from "src/components";
import { useAllVehicles } from "src/hooks";
import { useAllReservations } from "src/hooks/reservationHooks";

const columns: IDataTableColumn<ReservationDTO>[] = [
  {
    name: "ID",
    selector: (e) => e.id,
  },

  {
    name: "Date",
    selector: (e) => e.reservationDate,
  },

  {
    name: "Status",
    cell: (row) => (
      <p
        className={`${
          row.status === ReservationStatus.Cancelled
            ? "text-red-600"
            : "text-green-500"
        }`}
      >
        {row.status}
      </p>
    ),
  },
];

export function Reservation() {
  const { isLoading, data = [] } = useAllReservations();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      {withCrudDataTable({
        data,
        columns,
        sortable: true,
        addButtonText: "New Reservation",
        addPath: "/reservations/new",
        onDetails: (row) => `/reservations/${row.id}`,
        onDelete: (row) => `/reservations/${row.id}/delete`,
        editPath: (row) => `/reservations/${row.id}/edit`,
      })}
    </Container>
  );
}
