import { VehicleDTO } from "@shared/types";
import { useState } from "react";
import { Container, Loading } from "src/components";
import { useAllVehicles } from "src/hooks";

export default function Reservation() {
  const { isLoading, data = [] } = useAllVehicles();
  const [vehicle, setVehicle] = useState<VehicleDTO>();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <h1>Reservation</h1>
    </Container>
  );
}
