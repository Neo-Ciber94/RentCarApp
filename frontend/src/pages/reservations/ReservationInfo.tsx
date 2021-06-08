import { ReservationDTO } from "@shared/types";
import { TextInfo, Title } from "src/components";

export interface ReservationInfoProps {
  reservation: ReservationDTO;
}

export function ReservationInfo({ reservation }: ReservationInfoProps) {
  return (
    <>
      <Title title="Reservation" />
      <TextInfo label="ID" value={reservation.id} />
      <TextInfo label="Date" value={reservation.reservationDate} />
      <TextInfo label="Status" value={reservation.status} />
      <TextInfo
        label="Vehicle"
        value={`${reservation.vehicle.model.brand.name} ${reservation.vehicle.model.name}`}
      />

      <Title title="Client" />
      <TextInfo label="Client ID" value={reservation.client.id} />
      <TextInfo label="Client Name" value={reservation.client.name} />
      <TextInfo label="Client Email" value={reservation.client.email} />
    </>
  );
}
