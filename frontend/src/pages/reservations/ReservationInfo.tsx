import { ReservationDTO } from "@shared/types";
import { Row, TextInfo, Title } from "src/components";
import { capitalize } from "src/utils/capitalize";
import dayjs from "dayjs";

export interface ReservationInfoProps {
  reservation: ReservationDTO;
}

export function ReservationInfo({ reservation }: ReservationInfoProps) {
  return (
    <>
      <Title title="Reservation" />
      <Row>
        <TextInfo label="ID" value={reservation.id} />
        <TextInfo label="Created At" value={reservation.createdAt} />
      </Row>

      <Row>
        <TextInfo
          label="Reservation Date"
          value={dayjs(reservation.reservationDate).format("DD-MM-YYYY")}
        />
        <TextInfo label="Status" value={capitalize(reservation.status)} />
      </Row>

      <Row>
        <TextInfo label="Vehicle ID" value={reservation.vehicleId} />

        <TextInfo
          label="Vehicle"
          value={`${reservation.vehicle.model.brand.name} ${reservation.vehicle.model.name}`}
        />
      </Row>

      <Title title="Client" />
      <TextInfo label="Client ID" value={reservation.client.id} />
      <TextInfo label="Client Name" value={reservation.client.name} />
      <TextInfo label="Client Email" value={reservation.client.email} />
    </>
  );
}
