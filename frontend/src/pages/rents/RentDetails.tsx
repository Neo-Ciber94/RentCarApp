import { useHistory, useParams } from "react-router-dom";
import { Container, LinkButton, Loading, MainButton } from "src/components";
import { useRent } from "src/hooks/rentHooks";
import { RentView } from ".";

export function RentDetails() {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { isLoading, data: rent } = useRent(Number(params.id));

  if (isLoading || rent == null) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-4/6 md:w-5/6">
      <RentView rent={rent} />

      <div className="mt-4 flex flex-row w-full gap-4">
        <MainButton
          className="w-full"
          color="secondary"
          onClick={() => history.goBack()}
        >
          Back
        </MainButton>
        {rent.returnDate == null && (
          <LinkButton
            className="w-full text-center"
            color="primary"
            to={`/rents/${rent.id}/return`}
          >
            Return
          </LinkButton>
        )}
      </div>
    </Container>
  );
}
