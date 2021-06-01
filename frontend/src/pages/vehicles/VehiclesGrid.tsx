import { VehicleDTO } from "@shared/types";
import { Container } from "src/components";
import { VehicleCard } from "./VehicleCard";

interface VehicleGridProps {
  data: VehicleDTO[];
}

export const VehiclesGrid = ({ data }: VehicleGridProps) => {
  const vehicles = data.map((e, index) => (
    <VehicleCard key={index} vehicle={e} />
  ));

  return (
    <Container>
      <div className="flex flex-row gap-4">{vehicles}</div>
    </Container>
  );
};
