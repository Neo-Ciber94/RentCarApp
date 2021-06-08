import { ReservationDTO } from "@shared/types";
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
    selector: (e) => e.status,
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
        onDelete: (row) => console.log("DELETE", row),
        onDetails: (row) => console.log("DETAILS", row),
        onEdit: (row) => console.log("EDIT", row),
      })}
    </Container>
  );
}
