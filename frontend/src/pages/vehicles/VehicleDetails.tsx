import { useParams } from "react-router-dom";
import { Container, Loading } from "src/components";
import { TextInfo } from "src/components/TextInfo";
import { useVehicle } from "src/hooks";

export function VehicleDetails() {
  const params = useParams<{ id?: string }>();
  const { isLoading, data } = useVehicle(Number(params.id));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-3/6 md:w-5/6">
      <TextInfo label="ID" value={data!.id} />
    </Container>
  );
}
