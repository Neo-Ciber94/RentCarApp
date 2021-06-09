import { useQuery } from "react-query";
import { Services } from "src/services";

export function useAllReservations() {
  return useQuery("reservations", {
    queryFn: () => Services.reservations.getAll(),
    refetchOnMount: true,
  });
}

export function useReservation(id: number) {
  return useQuery("reservation", {
    queryFn: () => Services.reservations.get(id),
    refetchOnMount: true,
  });
}
