import { ReservationStatus } from "../ReservationStatus";
import { ClientDTO } from "./ClientDTO";
import { RentDTO } from "./RentDTO";

export interface ReservationDTO {
  id: number;
  clientId: number;
  client: ClientDTO;
  rentId: number;
  rent?: RentDTO;
  reservationDate: Date;
  status: ReservationStatus;
}
