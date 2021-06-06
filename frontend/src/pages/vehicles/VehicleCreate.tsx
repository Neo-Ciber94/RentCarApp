import { GearBox } from "@shared/types";
import { Container } from "src/components";
import { VehicleForm } from "./VehicleForm";
import { RandomString } from "src/utils/RandomString";

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
          licensePlate: RandomString.hex(6),
          engineNumber: RandomString.hex(6),
          chassisNumber: RandomString.hex(6),
        }}
      />
    </Container>
  );
}
