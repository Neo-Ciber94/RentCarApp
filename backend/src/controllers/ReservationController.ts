import { JsonController } from "routing-controllers";
import { Reservation } from "src/entities";
import { ReservationRespository } from "src/repositories";
import { ForwardController } from "./ForwardController";

@JsonController("/reservations")
export class ReservationController extends ForwardController<Reservation> {
  constructor() {
    super(new ReservationRespository());
  }
}
