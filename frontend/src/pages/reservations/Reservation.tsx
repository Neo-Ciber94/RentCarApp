import { ReservationDTO, ReservationStatus } from "@shared/types";
import { IDataTableColumn } from "react-data-table-component";
import { Container, Loading, withCrudDataTable } from "src/components";
import { useAllReservations } from "src/hooks/reservationHooks";
import dayjs from "dayjs";
import { capitalize } from "src/utils/capitalize";
import { string } from "yup/lib/locale";

const columns: IDataTableColumn<ReservationDTO>[] = [
  {
    name: "ID",
    selector: (e) => e.id,
  },

  {
    name: "Client",
    selector: (e) => e.client.name,
  },

  {
    name: "Reservation Date",
    selector: (e) => dayjs(e.reservationDate).format("DD-MM-YYYY"),
  },

  {
    name: "Status",
    selector: (e) => e.status,
    cell: (row) => {
      let className: string;
      switch (row.status) {
        case ReservationStatus.Active:
          className = "text-green-500";
          break;
        case ReservationStatus.Cancelled:
          className = "text-red-600";
          break;
        case ReservationStatus.Completed:
          className = "text-blue-600";
          break;
      }

      return <p className={className}>{capitalize(row.status)}</p>;
    },
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
