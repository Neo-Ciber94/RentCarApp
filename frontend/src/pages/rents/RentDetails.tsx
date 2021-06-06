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
    <Container className="lg:w-4/6 md:w-5/6">
      <RentView rent={data} />

      <div className="mt-4 flex flex-row w-full gap-4">
        <MainButton
          className="w-full"
          color="secondary"
          onClick={() => history.goBack()}
        >
          Back
        </MainButton>
        {data.returnDate == null && (
          <MainButton className="w-full" color="primary" onClick={() => {}}>
            Return
          </MainButton>
        )}
      </div>
    </Container>
  );
}
