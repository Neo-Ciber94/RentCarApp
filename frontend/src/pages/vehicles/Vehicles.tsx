import { Container } from "src/components";
import { VehicleDTO } from "@shared/types";
import { PrimaryButton } from "src/components/PrimaryButton";

export default function Vehicles() {
  const vehicles: VehicleDTO[] = [];

  return (
    <Container className="h-full">
      <PrimaryButton className="w-full sm:w-auto">Add Vehicle</PrimaryButton>
      {vehicles.length === 0 && (
        <div className="flex items-center justify-center content-center h-full pb-10">
          <h1 className="text-red-400 sm:text-5xl text-3xl font-light select-none">
            No vehicles available
          </h1>
        </div>
      )}
    </Container>
  );
}
