import { RentDTO, VehicleDTO } from ".";
import { TireStatus } from "../TireStatus";

export interface InspectionDTO {
  id: number;
  vehicleId: number;
  vehicle: VehicleDTO;
  rentId: number;
  rent: RentDTO;
  inspectionDate: Date;
  haveScratches: boolean;
  haveBrokenGlass: boolean;
  haveCarJack: boolean;
  haveTires: boolean;
  tireStatus: TireStatus;
  status?: string;
}
