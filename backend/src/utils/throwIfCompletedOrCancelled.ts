import { ReservationStatus } from "@shared/types";
import { Reservation } from "src/entities";

export function throwIfCompletedOrCancelled(reservation: Reservation) {
  if (reservation.status === ReservationStatus.Cancelled) {
    throw new Error(
      `Reservation with id ${reservation.id} is already cancelled`
    );
  }

  if (reservation.status === ReservationStatus.Completed) {
    throw new Error(
      `Reservation with id ${reservation.id} is already completed`
    );
  }
}
