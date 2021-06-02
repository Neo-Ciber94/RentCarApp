import { GearBox } from "@shared/types";
import { Container } from "src/components";
import { randomString } from "src/utils/randomString";
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
          licensePlate: randomString(6),
          engineNumber: randomString(6),
          chassisNumber: randomString(6),
        }}
      />
    </Container>
  );
}
