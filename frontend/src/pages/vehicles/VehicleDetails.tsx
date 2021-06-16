import { useParams } from "react-router-dom";
import { Container, Loading } from "src/components";
import { BottomButtonGroup } from "src/components/BottomButtonGroup";
import { useVehicle } from "src/hooks";
import { BaseRoutes } from "src/layout";
import Routes from "src/routes/Routes";
import { VehicleInfo } from "./VehicleInfo";

export function VehicleDetails() {
  const params = useParams<{ id?: string }>();
  const { isLoading, data } = useVehicle(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-4/6 md:w-5/6">
      <VehicleInfo vehicle={data!} />
      <BottomButtonGroup
        cancelPath={BaseRoutes.vehicles.path}
        confirmPath={Routes.vehicles(data.id, "edit")}
        confirmText="Edit"
      />
    </Container>
  );
}
