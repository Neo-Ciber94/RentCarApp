import { useParams } from "react-router-dom";
import { Container, Loading } from "src/components";
import { BottomButtonGroup } from "src/components/BottomButtonGroup";
import { useVehicle } from "src/hooks";
import { Routes } from "src/layout";
import { VehicleInfo } from "./VehicleInfo";

export function VehicleDetails() {
  const params = useParams<{ id?: string }>();
  const { isLoading, data } = useVehicle(Number(params.id));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-4/6 md:w-5/6">
      <VehicleInfo vehicle={data!} />
      <BottomButtonGroup
        cancelPath={Routes.vehicles.path}
        confirmPath={`${Routes.vehicles.path}/${data!.id}/edit`}
        confirmText="Edit"
      />
    </Container>
  );
}
