import { ReservationStatus } from "@shared/types";
import { useHistory, useParams } from "react-router";
import { BottomButtonGroup, Container, Loading } from "src/components";
import { useReservation } from "src/hooks/reservationHooks";
import Routes from "src/routes/Routes";
import { ReservationInfo } from "./ReservationInfo";

export function ReservationDetails() {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const { isLoading, data } = useReservation(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  console.log(params, data);
  const isCompleted =
    data.status === ReservationStatus.Cancelled ||
    data.status === ReservationStatus.Completed;

  return (
    <Container className="lg:w-4/6 md:w-5/6">
      <ReservationInfo reservation={data} />
      <BottomButtonGroup
        confirmText="Rent"
        confirmPath={Routes.reservations(data.id, "rent")}
        onCancel={() => history.push(Routes.reservations())}
        noConfirmButton={isCompleted}
      />
    </Container>
  );
}
