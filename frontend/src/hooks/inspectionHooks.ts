import { useQuery } from "react-query";
import { Services } from "src/services";

export function useAllInspections() {
  return useQuery("inspections", {
    queryFn: () => Services.inspections.getAll(),
    refetchOnMount: true,
  });
}

export function useInspection(id: number) {
  return useQuery("inspection", {
    queryFn: () => Services.inspections.get(id),
    refetchOnMount: true,
  });
}
