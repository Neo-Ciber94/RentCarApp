import { JsonController } from "routing-controllers";
import { Reservation } from "src/entities";
import { AbstractController } from "./AbstractController";

@JsonController("/reservations")
export class ReservationController extends AbstractController<Reservation> {
  constructor() {
    super({
      repository: Reservation.getRepository(),
    });
  }
}
