import { GearBox } from "@shared/types";
import { Container } from "src/components";
import { VehicleForm } from "./VehicleForm";
import crypto from "crypto";

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

function randomString(length: number) {
  return crypto.randomBytes(length).toString("hex");
}
