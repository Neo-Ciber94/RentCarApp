import { BrandDTO } from "./BrandDTO";

export interface ModelDTO {
  id: number;
  name: string;
  brandId: number;
  brand: BrandDTO;
}
