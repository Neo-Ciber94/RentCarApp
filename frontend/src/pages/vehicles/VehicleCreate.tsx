import { GearBox } from "@shared/types";
import { Container } from "src/components";
import { VehicleForm } from "./VehicleForm";

export function VehicleCreate() {
  return (
    <Container>
      <VehicleForm
        initialValues={{
          fuelId: 0,
          modelId: 0,
          rentPrice: 0,
          gearBox: GearBox.Automatic,
          status: "",
          description: "",
          licensePlate: "",
          engineNumber: "",
          chassisNumber: "",
        }}
      />
    </Container>
  );
}
