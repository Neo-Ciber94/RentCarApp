import { ReservationStatus } from "../ReservationStatus";
import { ClientDTO } from "./ClientDTO";
import { RentDTO } from "./RentDTO";
import { VehicleDTO } from "./VehicleDTO";

export interface ReservationDTO {
  id: number;
  clientId: number;
  client: ClientDTO;
  rentId: number;
  rent?: RentDTO;
  vehicleId: number;
  vehicle: VehicleDTO;
  createdAt?: Date;
  reservationDate: Date;
  status: ReservationStatus;
}
