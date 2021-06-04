import { calculateDaysPassed, calculateRentPrice } from "@shared/utils";
import { RentReturn } from "@shared/types";
import { Request, Response } from "express";
import { Body, JsonController, Post, Put, Req, Res } from "routing-controllers";
import { Rent, Vehicle } from "src/entities";
import { DeepPartial } from "typeorm";
import { AbstractController } from "./AbstractController";

@JsonController("/rents")
export class RentController extends AbstractController<Rent> {
  constructor() {
    super({
      repository: Rent.getRepository(),
    });
  }

  @Post()
  async post(@Body() rent: DeepPartial<Rent>) {
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

  @Put()
  async put(
    @Body() rent: DeepPartial<Rent> & { id: number },
    @Req() _: Request,
    @Res() response: Response
  ) {
    const rentToUpdate = await Rent.findOne(rent.id);

    if (rent.returnDate) {
      return response.sendStatus(400).send("Rent was already returned");
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

      return Rent.save(newRent);
    } else {
      return undefined;
    }
  }

  @Post("/return")
  async rentReturn(@Body() rent: RentReturn) {
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
}
