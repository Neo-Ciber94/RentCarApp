import { InspectionDTO } from "@shared/types";
import { ApiService } from "./ApiService";
import { webClient } from "./http";

export class InspectionService extends ApiService<InspectionDTO> {
  constructor() {
    super("/inspections");
  }

  getAllByRent(rentId: number): Promise<InspectionDTO[]> {
    return webClient.get(`${this.baseUrl}?rent=${rentId}`);
  }

  getAllByVehicle(vehicleId: number): Promise<InspectionDTO[]> {
    return webClient.get(`${this.baseUrl}?vehicle=${vehicleId}`);
  }
}
