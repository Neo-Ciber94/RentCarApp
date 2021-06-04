import { useParams } from "react-router-dom";
import { Container, Loading } from "src/components";
import { useRent } from "src/hooks/rentHooks";
import { RentView } from ".";

export function RentDetails() {
  const params = useParams<{ id: string }>();
  const { isLoading, data } = useRent(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-3/6 md:w-5/6">
      <RentView rent={data} />
    </Container>
  );
}
