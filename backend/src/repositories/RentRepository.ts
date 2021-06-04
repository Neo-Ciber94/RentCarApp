import { calculateDaysPassed, calculateRentPrice } from "@shared/utils";
import { RentDTO, RentReturn } from "@shared/types";
import { Rent, Vehicle } from "src/entities";
import { DeepPartial } from "typeorm";
import { err, ok, Result } from "@shared/result";
import { Mapper } from "src/utils";

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

  async create(rent: DeepPartial<Rent>) {
    const newRent = Rent.create({
      clientId: rent.clientId,
      comments: rent.comments,
      employeeId: rent.employeeId,
      vehicleId: rent.vehicleId,
    });

    const resultRent = await Rent.save(newRent);

    // Mark the vehicle as not available
    const rentedVehicle = await Vehicle.findOne(rent.vehicleId);
    rentedVehicle!.isAvailable = false;

    // Return the rent
    return resultRent;
  }

  async update(
    rent: DeepPartial<Rent>
  ): Promise<Result<RentDTO | undefined, string>> {
    const rentToUpdate = await Rent.findOne(rent.id);

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
        const vehicle = await Vehicle.findOne(rentToUpdate.vehicleId);
        vehicle!.isAvailable = false;
      }

      const result = await Rent.save(newRent);
      return ok(this.withDaysAndPrice(result));
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

      // Mark the vehicle as available
      vehicle!.isAvailable = true;

      // Sets the total price and days
      rentToReturn.returnDate = new Date();
      rentToReturn.totalDays = totalDays;
      rentToReturn.totalPrice = totalPrice;

      return Rent.save(rentToReturn);
    } else {
      return undefined;
    }
  }

  async delete(id: number) {
    const entityToDelete = await Rent.findOne(id);
    if (entityToDelete) {
      // Set the vehicle of the rent as avaiable
      const vehicle = await Vehicle.findOne(entityToDelete.vehicleId);
      vehicle!.isAvailable = true;

      // Removes the rent
      const result = await Rent.remove(entityToDelete);
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
