import { Response } from "express";
import { Get, JsonController, QueryParam, Res } from "routing-controllers";
import { Inspection } from "src/entities";
import { AbstractController } from "./AbstractController";
import { handleError } from "./handleError";

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
  async find(
    @Res() response?: Response,
    @QueryParam("rent") rent?: number,
    @QueryParam("vehicle") vehicle?: number
  ): Promise<Inspection[] | Response<Inspection[]>> {
    try {
      if (vehicle) {
        return await Inspection.find({
          where: { rentId: rent },
        });
      }

      if (vehicle) {
        return await Inspection.createQueryBuilder("inspection")
          .leftJoin("rent", "rent.vehicle")
          .where("rent.vehicleId = :vehicle", { vehicle: vehicle })
          .execute();
      }

      return this.repository.find();
    } catch (err) {
      return handleError(err, response!);
    }
  }
}
