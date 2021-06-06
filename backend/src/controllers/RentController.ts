import { calculateDaysPassed, calculateRentPrice } from "@shared/utils";
import { NewRent, RentReturn } from "@shared/types";
import { Response } from "express";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Res,
} from "routing-controllers";
import { Rent } from "src/entities";
import { DeepPartial } from "typeorm";
import { RentRespository } from "src/repositories";

@JsonController("/rents")
export class RentController {
  private repository = new RentRespository();

  @Get()
  async find() {
    return this.repository.find();
  }

  @Get("/:id")
  async findById(@Param("id") id: number) {
    return this.repository.findById(id);
  }

  @Post()
  async post(@Body() rent: NewRent) {
    return this.repository.create(rent);
  }

  @Put()
  async put(@Body() rent: DeepPartial<Rent>, @Res() response: Response) {
    const result = await this.repository.update(rent);
    if (result.isOk) {
      return result.get();
    } else {
      const error = result.getError();
      return response.sendStatus(400).send(error);
    }
  }

  @Post("/return")
  async rentReturn(@Body() rent: RentReturn) {
    return this.repository.rentReturn(rent);
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.repository.delete(id);
  }
}
