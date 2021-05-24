import { VehicleType } from "..";
import { BrandDTO } from "./BrandDTO";

export interface ModelDTO {
  id: number;
  name: string;
  brandId: number;
  brand: BrandDTO;
  vehicleType: VehicleType;
  capacity: number;
}
