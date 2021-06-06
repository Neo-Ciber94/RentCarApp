import { RentDTO } from ".";
import { TireStatus } from "../TireStatus";

export interface InspectionDTO {
  id: number;
  rentId: number;
  rent: RentDTO;
  inspectionDate: Date;
  haveScratches: boolean;
  haveBrokenGlass: boolean;
  haveCarJack: boolean;
  haveTires: boolean;
  frontLeftTire: TireStatus;
  frontRightTire: TireStatus;
  backLeftTire: TireStatus;
  backRightTire: TireStatus;
  status?: string;
}
