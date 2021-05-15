import { JsonController } from "routing-controllers";
import { Vehicle } from "src/entities";
import { AbstractController } from "./AbstractController";

@JsonController("/vehicles")
export class VehicleController extends AbstractController<Vehicle> {
  constructor() {
    super({
      repository: Vehicle.getRepository(),
    });
  }
}
