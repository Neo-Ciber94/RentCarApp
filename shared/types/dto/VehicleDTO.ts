import { GearBox } from "../GearBox";
import { FuelDTO } from "./FuelDTO";
import { ModelDTO } from "./ModelDTO";

export interface VehicleDTO {
  id: number;
  modelId: number;
  model: ModelDTO;
  fuelId: number;
  fuel: FuelDTO;
  image?: string;
  rentPrice: number;
  engineNumber: string;
  chassisNumber: string;
  licensePlate: string;
  gearBox: GearBox;
  status: string | null;
  isAvailable: boolean;
  description: string | null;
}
