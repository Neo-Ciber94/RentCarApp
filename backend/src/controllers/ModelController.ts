import { JsonController } from "routing-controllers";
import { Model } from "src/entities";
import { AbstractController } from "./AbstractController";

@JsonController("/models")
export class ModelController extends AbstractController<Model> {
  constructor() {
    super({
      repository: Model.getRepository(),
      relations: ["brand"],
    });
  }
}
