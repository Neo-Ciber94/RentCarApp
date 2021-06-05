import { useParams, useHistory } from "react-router-dom";
import { Loading, Container, MainButton } from "src/components";
import { useRent } from "src/hooks/rentHooks";
import { RentView } from ".";

export function RentDelete() {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { isLoading, data } = useRent(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-3/6 md:w-5/6">
      <RentView rent={data} />

      <div className="flex flex-row w-full mt-4 gap-4">
        <MainButton
          className="w-full"
          color="secondary"
          onClick={() => history.goBack()}
        >
          Cancel
        </MainButton>
        {data.returnDate == null && (
          <MainButton className="w-full" color="primary" onClick={() => {}}>
            Delete
          </MainButton>
        )}
      </div>
    </Container>
  );
}
