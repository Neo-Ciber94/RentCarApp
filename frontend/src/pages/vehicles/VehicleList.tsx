import { Container, Loading } from "src/components";
import { useAllVehicles } from "src/hooks";
import { VehicleCard } from "./VehicleCard";

export function VehicleList() {
  const { isLoading, data = [] } = useAllVehicles();

  if (isLoading) {
    return <Loading />;
  }

  const vehicles = data.map((e, index) => (
    <VehicleCard key={index} vehicle={e} />
  ));

  return (
    <Container>
      <div className="flex flex-row gap-4">{vehicles}</div>
    </Container>
  );
}
