import { ReservationStatus } from "@shared/types";
import { useHistory, useParams } from "react-router";
import { BottomButtonGroup, Container, Loading } from "src/components";
import { useReservation } from "src/hooks/reservationHooks";
import { Routes } from "src/layout";
import { ReservationInfo } from "./ReservationInfo";

export function ReservationDetails() {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { isLoading, data } = useReservation(Number(params.id));

  if (isLoading || data == null) {
    return <Loading />;
  }

  const isCompleted =
    data.status === ReservationStatus.Cancelled ||
    data.status === ReservationStatus.Completed;

  return (
    <Container>
      <ReservationInfo reservation={data} />
      <BottomButtonGroup
        confirmText="Edit"
        confirmPath={`/reservations/${data.id}`}
        onCancel={() => history.push(Routes.reservations.path)}
        noConfirmButton={isCompleted}
      />
    </Container>
  );
}
