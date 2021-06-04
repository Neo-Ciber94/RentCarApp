import { RentDTO, RentReturn } from "@shared/types";
import { ApiService } from "./ApiService";
import { webClient } from "./http";

export class RentService extends ApiService<RentDTO> {
  constructor() {
    super("/rents");
  }

  rentReturn(rent: RentReturn) {
    return webClient.post(`${this.baseUrl}/return`, rent);
  }
}
