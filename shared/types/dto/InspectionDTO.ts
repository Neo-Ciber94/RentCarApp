import { ClientDTO, VehicleDTO } from ".";
import { TireStatus } from "../TireStatus";

export interface InspectionDTO {
  id: number;
  vehicleId: number;
  vehicle: VehicleDTO;
  clientId: number;
  client: ClientDTO;
  inspectionDate: Date;
  haveScratches: boolean;
  haveBrokenGlass: boolean;
  haveCarJack: boolean;
  haveTires: boolean;
  tireStatus: TireStatus;
  status?: string;
}
