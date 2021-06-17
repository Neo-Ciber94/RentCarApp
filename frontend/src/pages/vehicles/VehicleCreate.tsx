import { GearBox, VehicleDTO } from "@shared/types";
import { Container } from "src/components";
import { VehicleForm } from "./VehicleForm";
import { RandomString } from "src/utils/RandomString";
import { toFormData } from "src/utils";
import { Services } from "src/services";
import Routes from "src/routes/Routes";
import { useHistory } from "react-router-dom";

export function VehicleCreate() {
  const history = useHistory();

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
        onSubmit={async (values, actions) => {
          console.log("create", values);
          const formData = toFormData(values);
          const result = await Services.vehicles.create(
            formData as unknown as VehicleDTO
          );

          console.log(result);
          actions.setSubmitting(false);
          history.push(Routes.vehicles());
        }}
      />
    </Container>
  );
}
