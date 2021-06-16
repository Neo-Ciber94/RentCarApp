import { useHistory, useParams } from "react-router-dom";
import { Container, Loading } from "src/components";
import { BottomButtonGroup } from "src/components/BottomButtonGroup";
import { useVehicle } from "src/hooks";
import { BaseRoutes } from "src/layout";
import { Services } from "src/services";
import { VehicleInfo } from "./VehicleInfo";

export function VehicleDelete() {
  const params = useParams<{ id?: string }>();
  const history = useHistory();
  const id = Number(params.id);
  const { isLoading, data } = useVehicle(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-3/6 md:w-5/6">
      <h1 className="sm:text-4xl text-2xl font-light text-center text-red-600">
        Delete Vehicle
      </h1>
      <VehicleInfo vehicle={data!} />
      <BottomButtonGroup
        confirmText="Delete"
        onCancel={() => history.push(BaseRoutes.vehicles.path)}
        onConfirm={async () => {
          const result = await Services.vehicles.delete(id);
          history.push(BaseRoutes.vehicles.path);
          console.log(result);
        }}
      />
    </Container>
  );
}
