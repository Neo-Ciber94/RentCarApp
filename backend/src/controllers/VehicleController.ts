import {
  Body,
  JsonController,
  Post,
  Put,
  UploadedFile,
  UseBefore,
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
import multer from "multer";
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
    return (await this.createVehicle(parseObj(entity), image))!;
  }

  @Put()
  async put(
    @Body() entity: Vehicle,
    @UploadedFile("image") image?: MulterFile
  ) {
    return this.createVehicle(parseObj(entity), image);
  }

  async createVehicle(
    entity: Vehicle,
    image?: MulterFile
  ): Promise<VehicleDTO | undefined> {
    return getManager().transaction(async (manager) => {
      const vehicle = manager.create(Vehicle, {
        id: entity.id,
        description: entity.description,
        isAvailable: entity.isAvailable,
        fuelId: entity.fuelId,
        modelId: entity.modelId,
        gearBox: entity.gearBox,
        rentPrice: entity.rentPrice,
        status: entity.status,
        chassisNumber: entity.chassisNumber,
        engineNumber: entity.engineNumber,
        licensePlate: entity.licensePlate,
      });

      /* prettier-ignore */
      // If is updating, check if the vehicle exist
      if (vehicle.id != null &&(await manager.findOne(Vehicle, vehicle.id)) == null) {
        return undefined;
      }

      // Inserts/Updates the entity
      let newVehicle: Vehicle;

      if (vehicle.id) {
        await manager.update(Vehicle, vehicle.id, vehicle);
        newVehicle = (await manager.findOne(Vehicle, vehicle.id))!;
      } else {
        newVehicle = await manager.save(Vehicle, vehicle);
      }

      // If there is an image
      if (image) {
        const fileExtension = path.extname(image.originalname);
        const fileName = `${newVehicle.id}${fileExtension}`;
        const filePath = path.join(VEHICLE_IMAGES_PATH, fileName);

        try {
          // Writes the file
          // FIXME: We need to compress images
          await fs.outputFile(filePath, image.buffer);
        } catch (err) {
          console.error(err);
        }

        // Sets the file path and save
        newVehicle.image = path.join(VEHICLES_PATH, fileName);
        await manager.save(Vehicle, newVehicle);
      }

      // Overlapping types
      return newVehicle as VehicleDTO;
    });
  }
}

// multipart/form  is not being parsed corretly, so we do this,
// FIXME: Implements without throw exceptions
function parseObj(obj: any): any {
  const result: any = {};

  for (const key in obj) {
    try {
      result[key] = JSON.parse(obj[key]);
    } catch {
      result[key] = obj[key];
    }
  }

  return result;
}
