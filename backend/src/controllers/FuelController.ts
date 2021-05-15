import { JsonController } from "routing-controllers";
import { Fuel } from "src/entities";
import { AbstractController } from "./AbstractController";

@JsonController("/fuels")
export class FuelController extends AbstractController<Fuel> {
  constructor() {
    super({
      repository: Fuel.getRepository(),
    });
  }
}
