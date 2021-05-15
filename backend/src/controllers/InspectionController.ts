import { JsonController } from "routing-controllers";
import { Inspection } from "src/entities";
import { AbstractController } from "./AbstractController";

@JsonController("/inspections")
export class InspectionController extends AbstractController<Inspection> {
  constructor() {
    super({
      repository: Inspection.getRepository(),
    });
  }
}
