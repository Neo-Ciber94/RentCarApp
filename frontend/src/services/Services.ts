import { BrandDTO, FuelDTO, ModelDTO } from "@shared/types";
import { ApiService } from "./ApiService";

export module Services {
  export const brands = new ApiService<BrandDTO>("/brands");
  export const models = new ApiService<ModelDTO>("/models");
  export const fuels = new ApiService<FuelDTO>("/fuels");
}
