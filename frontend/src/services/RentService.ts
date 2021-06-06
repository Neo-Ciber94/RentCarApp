import { NewRent, RentDTO, RentReturn } from "@shared/types";
import { ApiService } from "./ApiService";
import { webClient } from "./http";

export class RentService extends ApiService<RentDTO, NewRent> {
  constructor() {
    super("/rents");
  }

  create(rent: NewRent) {
    return webClient.post<RentDTO, NewRent>(`${this.baseUrl}`, rent);
  }

  rentReturn(rent: RentReturn) {
    return webClient.post(`${this.baseUrl}/return`, rent);
  }
}
