import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ProtectedRoute } from "src/components";
import { Footer, Header } from "src/layout";
import { ROLES_ALL } from "src/config/roles";
import NotFound from "../common/NotFound";
import { VehicleCreate } from "./VehicleCreate";
import { VehicleDelete } from "./VehicleDelete";
import { VehicleDetails } from "./VehicleDetails";
import { VehicleEdit } from "./VehicleEdit";
import { Vehicles } from "./Vehicles";
import Routes from "src/routes/Routes";

export function VehicleRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Header title="Vehicles" />
      <Switch>
        {/* vehicles */}
        <Route exact path={match.url} component={Vehicles} />

        {/* vehicles/new */}
        <ProtectedRoute
          exact
          path={Routes.join(match.url, "new")}
          roles={ROLES_ALL}
          component={VehicleCreate}
        />

        {/* vehicles/:id */}
        <ProtectedRoute
          exact
          path={Routes.join(match.url, ":id")}
          roles={ROLES_ALL}
          component={VehicleDetails}
        />

        {/* vehicles/:id/edit */}
        <ProtectedRoute
          exact
          path={Routes.join(match.url, ":id", "edit")}
          roles={ROLES_ALL}
          component={VehicleEdit}
        />

        {/* vehicles/:id/delete */}
        <ProtectedRoute
          exact
          path={Routes.join(match.url, ":id", "delete")}
          roles={ROLES_ALL}
          component={VehicleDelete}
        />

        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}
