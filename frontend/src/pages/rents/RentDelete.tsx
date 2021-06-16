import { useParams, useHistory } from "react-router-dom";
import { Loading, Container, MainButton } from "src/components";
import { useRent } from "src/hooks/rentHooks";
import { BaseRoutes } from "src/layout";
import { Services } from "src/services";
import { RentInfo } from ".";

export function RentDelete() {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { isLoading, data: rent } = useRent(Number(params.id));

  if (isLoading || rent == null) {
    return <Loading />;
  }

  return (
    <Container className="lg:w-4/6 md:w-5/6">
      <RentInfo rent={rent} />

      <div className="flex flex-row w-full mt-4 gap-4">
        <MainButton
          className="w-full"
          color="secondary"
          onClick={() => history.goBack()}
        >
          Cancel
        </MainButton>
        {rent.returnDate == null && (
          <MainButton
            className="w-full"
            color="primary"
            onClick={async () => {
              await Services.rents.delete(rent.id);
              history.push(BaseRoutes.rent.path);
            }}
          >
            Delete
          </MainButton>
        )}
      </div>
    </Container>
  );
}
