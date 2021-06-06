import { Loading } from "src/components";
import { useAllVehicles } from "src/hooks";
import { ReservationClient } from "./ReservationClient";

export default function Reservation() {
  const { isLoading } = useAllVehicles();

  if (isLoading) {
    return <Loading />;
  }

  return <ReservationClient />;
}
