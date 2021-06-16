import { VehicleDTO } from "@shared/types";
import { useHistory, useParams } from "react-router-dom";
import { Container, Loading } from "src/components";
import { useVehicle } from "src/hooks";
import Routes from "src/routes/Routes";
import { Services } from "src/services";
import { toFormData } from "src/utils";
import { VehicleForm } from "./VehicleForm";

export function VehicleEdit() {
  const params = useParams<{ id?: string }>();
  const history = useHistory();
  const { isLoading, data } = useVehicle(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <Container>
      <VehicleForm
        initialValues={data}
        onSubmit={async (values, actions) => {
          const formData = toFormData(values);

          const result = await Services.vehicles.update(
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
