import {
  BrandDTO,
  EmployeeDTO,
  FuelDTO,
  ModelDTO,
  UserDTO,
} from "@shared/types";
import { ApiService } from "./ApiService";

export module Services {
  export const brands = new ApiService<BrandDTO>("/brands");
  export const models = new ApiService<ModelDTO>("/models");
  export const fuels = new ApiService<FuelDTO>("/fuels");
  export const users = new ApiService<UserDTO>("/users");
  export const employees = new ApiService<EmployeeDTO>("/employees");
}
