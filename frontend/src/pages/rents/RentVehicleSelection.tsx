import { VehicleDTO } from "@shared/types";
import { FormikErrors } from "formik";
import { Loading, Container, FormInput } from "src/components";
import { useAllVehicles } from "src/hooks";
import { RentValues } from ".";
import { VehicleCard } from "..";

export interface VehicleSelectionProps {
  onSelect: (vehicle: VehicleDTO) => void;
  selected?: VehicleDTO;
  errors: FormikErrors<RentValues>;
}

export function RentVehicleSelection({
  errors,
  onSelect,
  selected,
}: VehicleSelectionProps) {
  const { isLoading, data = [] } = useAllVehicles();

  if (isLoading) {
    return <Loading />;
  }

  const vehicles = data.map((e, index) => {
    const isSelected = selected?.id === e.id;
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
        value={selected?.id || 0}
      />

      <div className="flex flex-row flex-wrap gap-4">{vehicles}</div>
      {errors.vehicleId && (
        <p className="text-red-500 text-xs mt-4">{errors.vehicleId}</p>
      )}
    </Container>
  );
}
