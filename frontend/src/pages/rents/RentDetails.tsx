import { useHistory, useParams } from "react-router-dom";
import {
  BottomButtonGroup,
  Container,
  Loading,
  MainButton,
} from "src/components";
import { useRent } from "src/hooks/rentHooks";
import { RentView } from ".";

export function RentDetails() {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { isLoading, data } = useRent(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-3/6 md:w-5/6">
      <RentView rent={data} />

      <BottomButtonGroup
        onCancel={() => history.goBack()}
        confirmText="Return"
        confirmPath={`/rents/${data.id}/return`}
      />
    </Container>
  );
}
