import { calculateDaysPassed, calculateRentPrice } from "@shared/utils";
import { NewRent, RentDTO, RentReturn } from "@shared/types";
import { Client, Rent, Vehicle } from "src/entities";
import { DeepPartial, EntityManager, getManager } from "typeorm";
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
      await this.markVehicleAvailable(rent.vehicleId, false, manager);

      // Return the rent
      return resultRent;
    });
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
        const oldVehicle = await Vehicle.findOne(rentToUpdate.vehicleId);
        oldVehicle!.isAvailable = true;
        await Vehicle.save(oldVehicle!);
      }

      const result = await Rent.save(newRent);

      // Mark vehicle as not available
      await this.markVehicleAvailable(rent.vehicleId!, false);

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

      if (vehicle == null) {
        throw new Error("No vehicle to return");
      }

      if (vehicle.isAvailable === true) {
        throw Error(`Vehicle is id ${vehicle.id} is not rented`);
      }

      // Mark the vehicle as available
      await this.markVehicleAvailable(vehicle.id, true);

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
      // Removes the rent
      const result = await Rent.remove(entityToDelete);

      // Mark vehicle as available
      this.markVehicleAvailable(result.vehicleId, true);
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

  async markVehicleAvailable(
    vehicleId: number,
    isAvailable: boolean,
    manager?: EntityManager
  ) {
    if (manager) {
      const vehicle = await manager.findOne(Vehicle, vehicleId);
      vehicle!.isAvailable = isAvailable;
      await manager.save(vehicle);
    } else {
      const vehicle = await Vehicle.findOne(vehicleId);
      vehicle!.isAvailable = isAvailable;
      await Vehicle.save(vehicle!);
    }
  }
}
