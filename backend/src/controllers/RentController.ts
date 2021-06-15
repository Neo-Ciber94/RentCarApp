import { NewRent, RentFromReservation, RentReturn } from "@shared/types";
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
import { handleError } from "./handleError";

@JsonController("/rents")
export class RentController {
  private repository = new RentRespository();

  @Get()
  async find(@Res() response: Response) {
    try {
      return this.repository.find();
    } catch (err) {
      console.error(err);
      return response;
    }
  }

  @Get("/:id")
  async findById(@Param("id") id: number, @Res() response: Response) {
    return this.repository
      .findById(id)
      .catch((error) => handleError(error, response));
  }

  @Post()
  async post(@Body() rent: NewRent, @Res() response: Response) {
    return this.repository
      .create(rent)
      .catch((error) => handleError(error, response));
  }

  @Put()
  async put(@Body() rent: DeepPartial<Rent>, @Res() response: Response) {
    try {
      const result = await this.repository.update(rent);
      if (result.isOk) {
        return result.get();
      } else {
        const error = result.getError();
        return response.sendStatus(400).send(error);
      }
    } catch (error) {
      return handleError(error, response);
    }
  }

  @Post("/return")
  async rentReturn(@Body() rent: RentReturn, @Res() response: Response) {
    return this.repository
      .rentReturn(rent)
      .catch((error) => handleError(error, response));
  }

  @Post("/reserved")
  async fromReservation(
    @Body() reservation: RentFromReservation,
    @Res() response: Response
  ) {
    return this.repository
      .fromReservation(reservation)
      .catch((error) => handleError(error, response));
  }

  @Delete("/:id")
  async delete(@Param("id") id: number, @Res() response: Response) {
    return this.repository
      .delete(id)
      .catch((error) => handleError(error, response));
  }
}
