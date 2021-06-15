import {
  Body,
  JsonController,
  Post,
  Put,
  Res,
  UploadedFile,
} from "routing-controllers";
import { Vehicle } from "src/entities";
import { AbstractController } from "./AbstractController";

// No idea why multer typing is implemented like this:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18569
import "multer";
import { VehicleDTO } from "@shared/types";
import { Response } from "express";
import { VehicleRespository } from "src/repositories";
import { handleError } from "./handleError";
type MulterFile = Express.Multer.File;

@JsonController("/vehicles")
export class VehicleController extends AbstractController<
  Vehicle,
  VehicleDTO,
  VehicleRespository
> {
  constructor() {
    super({
      repository: new VehicleRespository(),
    });
  }

  @Post()
  async post(
    @Body() entity: Vehicle,
    @Res() response?: Response,
    @UploadedFile("image") image?: MulterFile
  ) {
    return this.repository
      .create(entity, image)
      .catch((error) => handleError(error, response!));
  }

  @Put()
  async put(
    @Body() entity: Vehicle,
    @Res() response?: Response,
    @UploadedFile("image") image?: MulterFile
  ) {
    return this.repository
      .create(entity, image)
      .catch((error) => handleError(error, response!));
  }
}
