import { useParams } from "react-router-dom";
import { Container, Loading } from "src/components";
import { useVehicle } from "src/hooks";
import { VehicleForm } from "./VehicleForm";

export function VehicleEdit() {
  const params = useParams<{ id?: string }>();
  const { isLoading, data } = useVehicle(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <Container>
      <VehicleForm initialValues={data} />
    </Container>
  );
}
