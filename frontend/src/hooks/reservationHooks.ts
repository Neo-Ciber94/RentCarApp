import { useQuery } from "react-query";
import { Services } from "src/services";

export function useAllReservations() {
  return useQuery({
    queryFn: () => Services.reservations.getAll(),
    refetchOnMount: true,
  });
}

export function useReservation(id: number) {
  return useQuery({
    queryFn: () => Services.reservations.get(id),
    refetchOnMount: true,
  });
}
