import { Switch, Route, useRouteMatch } from "react-router";
import { ProtectedRoute } from "src/components";
import { ROLES_ALL } from "src/config";
import { Footer, Header } from "src/layout";
import { Reservation } from "./Reservation";
import { ReservationCreate } from "./ReservationCreate";
import { ReservationDelete } from "./ReservationDelete";
import { ReservationDetails } from "./ReservationDetails";
import { ReservationEdit } from "./ReservationEdit";
import { ReservationRent } from "./ReservationRent";

export function ReservationRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Header title="Reservations" />
      <Switch>
        <ProtectedRoute
          exact
          path={match.url}
          roles={ROLES_ALL}
          component={Reservation}
        />
        <Route exact path={`${match.url}/new`} component={ReservationCreate} />
        <ProtectedRoute
          exact
          path={`${match.url}/:id`}
          roles={ROLES_ALL}
          component={ReservationDetails}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/:id/edit`}
          roles={ROLES_ALL}
          component={ReservationEdit}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/:id/rent`}
          roles={ROLES_ALL}
          component={ReservationRent}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/:id/delete`}
          roles={ROLES_ALL}
          component={ReservationDelete}
        />
      </Switch>
      <Footer />
    </>
  );
}
