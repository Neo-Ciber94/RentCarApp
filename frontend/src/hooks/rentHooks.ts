import { useQuery } from "react-query";
import { Services } from "src/services";

export function useAllRents() {
  return useQuery("rents", {
    queryFn: () => Services.rents.getAll(),
  });
}

export function useRent(id: number) {
  return useQuery("rent", {
    queryFn: () => Services.rents.get(id),
  });
}
