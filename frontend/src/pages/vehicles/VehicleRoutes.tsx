import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ProtectedRoute } from "src/components";
import { Footer, Header } from "src/layout";
import { ROLES_ALL } from "src/roles";
import NotFound from "../common/NotFound";
import { VehicleCreate } from "./VehicleCreate";
import { VehicleDelete } from "./VehicleDelete";
import { VehicleDetails } from "./VehicleDetails";
import { VehicleEdit } from "./VehicleEdit";
import { Vehicles } from "./Vehicles";

export function VehicleRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Header title="Vehicles" />
      <Switch>
        <Route exact path={match.url} component={Vehicles} />
        <ProtectedRoute
          exact
          path={`${match.url}/new`}
          roles={ROLES_ALL}
          component={VehicleCreate}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/:id`}
          roles={ROLES_ALL}
          component={VehicleDetails}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/:id/edit`}
          roles={ROLES_ALL}
          component={VehicleEdit}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/:id/delete`}
          roles={ROLES_ALL}
          component={VehicleDelete}
        />

        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}
