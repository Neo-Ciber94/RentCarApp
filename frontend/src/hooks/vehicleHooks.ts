import { useQuery } from "react-query";
import { Services } from "src/services";

export function useVehicle(id: number) {
  return useQuery("vehicle", () => Services.vehicles.get(id));
}

export function useAllVehicles() {
  return useQuery("vehicles", () => Services.vehicles.getAll());
}
