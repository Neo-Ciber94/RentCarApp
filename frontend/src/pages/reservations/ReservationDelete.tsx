import { ReservationStatus } from "@shared/types";
import { useHistory, useParams } from "react-router";
import { BottomButtonGroup, Container, Loading } from "src/components";
import { useReservation } from "src/hooks/reservationHooks";
import { Routes } from "src/layout";
import { Services } from "src/services";
import { ReservationInfo } from "./ReservationInfo";

export function ReservationDelete() {
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
    <Container className="lg:w-4/6 md:w-5/6">
      <ReservationInfo reservation={data} />
      <BottomButtonGroup
        confirmText="Delete"
        onConfirm={async () => {
          await Services.reservations.delete(data.id);
          history.push(Routes.reservations.path);
        }}
        onCancel={() => history.push(Routes.reservations.path)}
        noConfirmButton={isCompleted}
      />
    </Container>
  );
}
