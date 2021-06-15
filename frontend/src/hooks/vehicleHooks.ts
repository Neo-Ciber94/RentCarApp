import { useQuery } from "react-query";
import { Services } from "src/services";

export function useVehicle(id: number) {
  return useQuery(["vehicle", id], {
    queryFn: () => Services.vehicles.get(id),
    refetchOnMount: true,
  });
}

export function useAllVehicles() {
  return useQuery("vehicles", {
    queryFn: () => Services.vehicles.getAll(),
    refetchOnMount: true,
  });
}
