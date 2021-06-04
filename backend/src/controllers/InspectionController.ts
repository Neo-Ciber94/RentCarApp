import { Get, JsonController, QueryParam } from "routing-controllers";
import { Inspection } from "src/entities";
import { AbstractController } from "./AbstractController";

@JsonController("/inspections")
export class InspectionController extends AbstractController<Inspection> {
  constructor() {
    super({
      repository: Inspection.getRepository(),
    });
  }

  // Overwrite
  find(): Promise<Inspection[]>;

  @Get()
  find(
    @QueryParam("rent") rent?: number,
    @QueryParam("vehicle") vehicle?: number
  ): Promise<Inspection[] | Inspection[]> {
    if (vehicle) {
      return Inspection.find({
        where: { rentId: rent },
      });
    }

    if (vehicle) {
      return Inspection.createQueryBuilder("inspection")
        .leftJoin("rent", "rent.vehicle")
        .where("rent.vehicleId = :vehicle", { vehicle: vehicle })
        .execute();
    }

    return this.repository.find();
  }
}
