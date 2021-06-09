import { ReservationDTO, ReservationStatus } from "@shared/types";
import { IDataTableColumn } from "react-data-table-component";
import { Container, Loading, withCrudDataTable } from "src/components";
import { useAllReservations } from "src/hooks/reservationHooks";
import dayjs from "dayjs";
import { capitalize } from "src/utils/capitalize";

const columns: IDataTableColumn<ReservationDTO>[] = [
  {
    name: "ID",
    selector: (e) => e.id,
  },

  {
    name: "Reservation Date",
    selector: (e) => dayjs(e.reservationDate).format("DD-MM-YYYY"),
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
        {capitalize(row.status)}
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
    <Container className="lg:max-w-6xl">
      {withCrudDataTable({
        data,
        columns,
        sortable: true,
        addButtonText: "New Reservation",
        addPath: "/reservations/new",
        detailsPath: (row) => `/reservations/${row.id}`,
        deletePath: (row) => `/reservations/${row.id}/delete`,
        editPath: (row) => `/reservations/${row.id}/edit`,
        canEdit: (row) => row.status === ReservationStatus.Active,
        canDelete: (row) => row.status === ReservationStatus.Active,
      })}
    </Container>
  );
}
