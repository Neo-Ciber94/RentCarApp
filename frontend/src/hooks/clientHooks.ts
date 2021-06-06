import { useQuery } from "react-query";
import { Services } from "src/services";

export function useAllClients() {
  return useQuery({
    queryFn: () => Services.clients.getAll(),
    refetchOnMount: true,
  });
}

export function useClient(id: number) {
  return useQuery({
    queryFn: () => Services.clients.get(id),
    refetchOnMount: true,
  });
}
