import { ReservationStatus } from "@shared/types";
import { RepositoryLike } from "src/controllers/ForwardController";
import { Reservation } from "src/entities";
import { markVehicleAvailable } from "src/utils";
import { throwIfCompletedOrCancelled } from "src/utils/throwIfCompletedOrCancelled";

const INCLUDES = ["client", "vehicle", "vehicle.model", "vehicle.model.brand"];

export class ReservationRespository implements RepositoryLike<Reservation> {
  find() {
    return Reservation.find({ relations: INCLUDES });
  }

  findById(id: number) {
    return Reservation.findOne(id, { relations: INCLUDES });
  }

  async create(reservation: Partial<Reservation>) {
    // FIXME: Create both client and reservation within a db transation
    const newReservation = Reservation.create({
      clientId: reservation.clientId,
      vehicleId: reservation.vehicleId,
      reservationDate: reservation.reservationDate,
    });

    const result = await Reservation.save(newReservation);

    // Mark vehicle as not available
    await markVehicleAvailable(result.vehicleId, false);

    return result;
  }

  async update(reservation: Reservation) {
    const reservationToUpdate = await Reservation.findOne(reservation.id);

    if (reservationToUpdate) {
      throwIfCompletedOrCancelled(reservationToUpdate);
      const result = await Reservation.save(reservation);

      // If are different vehicles, mark the old one as available
      if (result.vehicleId !== reservationToUpdate.vehicleId) {
        await markVehicleAvailable(reservationToUpdate.vehicleId, true);
      }

      await markVehicleAvailable(reservation.vehicleId, false);
      return result;
    } else {
      return undefined;
    }
  }

  async delete(id: number) {
    const reservation = await Reservation.findOne(id);
    if (reservation) {
      throwIfCompletedOrCancelled(reservation);

      // Mark the reserved vehicle as available
      markVehicleAvailable(reservation.vehicleId, true);

      reservation.status = ReservationStatus.Cancelled;
      return Reservation.save(reservation);
    } else {
      return undefined;
    }
  }
}
