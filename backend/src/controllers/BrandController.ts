import { JsonController } from "routing-controllers";
import { Brand } from "src/entities";
import { AbstractController } from "./AbstractController";

@JsonController("/brands")
export class BrandController extends AbstractController<Brand> {
  constructor() {
    super({
      repository: Brand.getRepository(),
    });
  }
}
