import {
  Body,
  JsonController,
  Post,
  Put,
  UploadedFile,
} from "routing-controllers";
import { Vehicle } from "src/entities";
import { AbstractController } from "./AbstractController";
import fs from "fs-extra";

// No idea why multer typing is implemented like this:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18569
import "multer";
import { IMAGES_PATH } from "src/config";
import path from "path";
import { VehicleDTO } from "@shared/types";
import { getManager } from "typeorm";
type MulterFile = Express.Multer.File;

const VEHICLES_PATH = "vehicles";
const VEHICLE_IMAGES_PATH = path.join(IMAGES_PATH, VEHICLES_PATH);

@JsonController("/vehicles")
export class VehicleController extends AbstractController<Vehicle, VehicleDTO> {
  constructor() {
    super({
      repository: Vehicle.getRepository(),
      relations: ["fuel", "model", "model.brand"],
    });
  }

  @Post()
  async post(
    @Body() entity: Vehicle,
    @UploadedFile("image") image?: MulterFile
  ) {
    return (await this.createVehicle(entity, image))!;
  }

  @Put()
  async put(
    @Body() entity: Vehicle,
    @UploadedFile("image") image?: MulterFile
  ) {
    return this.createVehicle(entity, image);
  }

  async createVehicle(
    entity: Vehicle,
    image?: MulterFile
  ): Promise<VehicleDTO | undefined> {
    return getManager().transaction(async (manager) => {
      const vehicle = manager.create(Vehicle, entity);

      // If is updating, check if the vehicle exist
      if (
        entity.id != null &&
        (await manager.findOne(Vehicle, entity.id)) == null
      ) {
        return undefined;
      }

      // Inserts/Updates the entity
      let newVehicle = await manager.save(vehicle);

      // If there is an image
      if (image) {
        console.log(image);
        const fileExtension = path.extname(image.originalname);
        const fileName = `${newVehicle.id}${fileExtension}`;
        const filePath = path.join(VEHICLE_IMAGES_PATH, fileName);

        try {
          // Writes the file
          await fs.outputFile(filePath, image.buffer);
        } catch (err) {
          console.error(err);
        }

        // Sets the file path and save
        newVehicle.image = path.join(VEHICLES_PATH, fileName);
        await manager.save(newVehicle);
      }

      // Overlapping types
      return newVehicle as VehicleDTO;
    });
  }
}
