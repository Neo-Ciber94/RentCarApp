import { VehicleDTO } from "@shared/types";
import { useRef } from "react";
import { Loading, Container, FormInput } from "src/components";
import { useAllVehicles } from "src/hooks";
import { VehicleCard } from "..";

export interface VehicleSelectionProps {
  onSelect: (vehicle: VehicleDTO) => void;
  selectedId?: number;
  error?: string;
}

export function RentVehicleSelection({
  error,
  onSelect,
  selectedId,
}: VehicleSelectionProps) {
  const defaultSelected = useRef(selectedId);
  const { isLoading, data = [] } = useAllVehicles();

  if (isLoading) {
    return <Loading />;
  }

  // Get all the available vehicles
  const availableVehicles = data.filter(
    (v) => v.isAvailable || v.id === defaultSelected.current
  );

  const vehicles = availableVehicles.map((e, index) => {
    const isSelected = selectedId === e.id;
    return (
      <VehicleCard
        key={index}
        vehicle={e}
        onClick={() => onSelect(e)}
        className={`cursor-pointer ${
          isSelected ? "ring-4 ring-red-500 ring-opacity-90" : ""
        }`}
      />
    );
  });

  return (
    <Container className="lg:max-w-5xl">
      {/* We use a hidden field for the id */}
      <FormInput
        label="Vehicle"
        name="vehicleId"
        type="hidden"
        value={selectedId || 0}
      />

      <div className="flex flex-row flex-wrap gap-4">{vehicles}</div>
      {error && <p className="text-red-500 text-xs mt-4">{error}</p>}
    </Container>
  );
}
