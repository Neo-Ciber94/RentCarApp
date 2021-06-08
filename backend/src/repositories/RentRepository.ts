import { calculateDaysPassed, calculateRentPrice } from "@shared/utils";
import {
  NewRent,
  RentDTO,
  RentFromReservation,
  RentReturn,
  ReservationStatus,
} from "@shared/types";
import { Client, Rent, Reservation, Vehicle } from "src/entities";
import { DeepPartial, EntityManager, getManager } from "typeorm";
import { err, ok, Result } from "@shared/result";
import { markVehicleAvailable } from "src/utils";
import { Body, BodyParam, Post } from "routing-controllers";
import { throwIfCompletedOrCancelled } from "src/utils/throwIfCompletedOrCancelled";

const INCLUDES = [
  "vehicle",
  "vehicle.model",
  "vehicle.model.brand",
  "client",
  "employee",
  "employee.user",
];

export class RentRespository {
  async find() {
    const result = await Rent.find({ relations: INCLUDES });
    return result.map(this.withDaysAndPrice);
  }

  async findById(id: number) {
    const result = await Rent.findOne(id, { relations: INCLUDES });
    if (result) {
      return this.withDaysAndPrice(result);
    } else {
      return undefined;
    }
  }

  async create(rent: NewRent): Promise<Rent> {
    return getManager().transaction(async (manager) => {
      const newClient = manager.create(Client, {
        name: rent.name,
        email: rent.email,
        documentId: rent.documentId,
        creditCard: rent.creditCard,
        creditLimit: rent.creditLimit,
      });

      await manager.save(newClient);

      const newRent = manager.create(Rent, {
        clientId: newClient.id,
        comments: rent.comments,
        employeeId: rent.employeeId,
        vehicleId: rent.vehicleId,
      });

      const resultRent = await manager.save(newRent);

      // Mark the vehicle as not available
      await markVehicleAvailable(rent.vehicleId, false, manager);

      // Return the rent
      return resultRent;
    });
  }

  async update(
    rent: DeepPartial<Rent>
  ): Promise<Result<Rent | undefined, string>> {
    const rentToUpdate = await Rent.findOne(rent.id, {
      relations: ["vehicle"],
    });

    if (rent.returnDate) {
      return err("Rent was already returned");
    }

    if (rentToUpdate) {
      const newRent = Rent.create({
        id: rentToUpdate.id,
        clientId: rent.clientId,
        comments: rent.comments,
        employeeId: rent.employeeId,
        vehicleId: rent.vehicleId,
      });

      // If is changing vehicle, mark the old as available
      if (rentToUpdate.vehicleId !== rent.vehicleId) {
        await markVehicleAvailable(rentToUpdate.vehicleId, true);
      }

      const result = await Rent.save(newRent);

      // Mark vehicle as not available
      await markVehicleAvailable(rent.vehicleId!, false);

      return ok(result);
    } else {
      return ok(undefined);
    }
  }

  async rentReturn(rent: RentReturn) {
    const rentToReturn = await Rent.findOne(rent.rentId);
    if (rentToReturn) {
      const vehicle = await Vehicle.findOne(rentToReturn.vehicleId);
      const totalDays = calculateDaysPassed(rentToReturn.rentDate);
      const totalPrice = calculateRentPrice(vehicle!.rentPrice, totalDays);

      if (vehicle == null) {
        throw new Error("No vehicle to return");
      }

      if (vehicle.isAvailable === true) {
        throw Error(`Vehicle is id ${vehicle.id} is not rented`);
      }

      // Mark the vehicle as available
      await markVehicleAvailable(vehicle.id, true);

      // Sets the total price and days
      rentToReturn.returnDate = new Date();
      rentToReturn.totalDays = totalDays;
      rentToReturn.totalPrice = totalPrice;

      return Rent.save(rentToReturn);
    } else {
      return undefined;
    }
  }

  @Post("/reserved")
  async fromReservation(@Body() rentFromReservation: RentFromReservation) {
    const reservation = await Reservation.findOne(
      rentFromReservation.reservationId
    );
    if (reservation) {
      throwIfCompletedOrCancelled(reservation);

      const newRent = Rent.create({
        clientId: reservation.clientId,
        vehicleId: reservation.vehicleId,
        employeeId: rentFromReservation.employeeId,
        comments: rentFromReservation.comments,
      });

      const result = await Rent.save(newRent);

      // Complete the reservation
      reservation.rent = result;
      reservation.status = ReservationStatus.Completed;
      await Reservation.save(reservation);

      return result;
    } else {
      return undefined;
    }
  }

  async delete(id: number) {
    const entityToDelete = await Rent.findOne(id);
    if (entityToDelete) {
      // Removes the rent
      const result = await Rent.remove(entityToDelete);

      // Mark vehicle as available
      markVehicleAvailable(result.vehicleId, true);
      return result;
    } else {
      return undefined;
    }
  }

  withDaysAndPrice(rent: Rent): RentDTO {
    const totalDays = calculateDaysPassed(rent.rentDate);
    const totalPrice = calculateRentPrice(rent.vehicle.rentPrice, totalDays);
    return {
      ...(rent as RentDTO),
      totalDays,
      totalPrice,
    };
  }
}
