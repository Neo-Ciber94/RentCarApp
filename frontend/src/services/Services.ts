import {
  BrandDTO,
  EmployeeDTO,
  FuelDTO,
  InspectionDTO,
  ModelDTO,
  RentDTO,
  ReservationDTO,
  UserDTO,
  VehicleDTO,
} from "@shared/types";
import { ApiService } from "./ApiService";

export module Services {
  export const brands = new ApiService<BrandDTO>("/brands");
  export const models = new ApiService<ModelDTO>("/models");
  export const fuels = new ApiService<FuelDTO>("/fuels");
  export const users = new ApiService<UserDTO>("/users");
  export const employees = new ApiService<EmployeeDTO>("/employees");
  export const vehicles = new ApiService<VehicleDTO>("/vehicles");
  export const rents = new ApiService<RentDTO>("/rents");
  export const inspections = new ApiService<InspectionDTO>("/inspections");
  export const reservations = new ApiService<ReservationDTO>("/reservations");
}
