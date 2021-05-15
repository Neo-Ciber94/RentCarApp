import { JsonController } from "routing-controllers";
import { Rent } from "src/entities";
import { AbstractController } from "./AbstractController";

@JsonController("/rents")
export class RentController extends AbstractController<Rent> {
  constructor() {
    super({
      repository: Rent.getRepository(),
    });
  }
}
