import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Footer, Header } from "src/layout";
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
        <Route exact path={`${match.url}/new`} component={VehicleCreate} />
        <Route exact path={`${match.url}/:id`} component={VehicleDetails} />
        <Route exact path={`${match.url}/:id/edit`} component={VehicleEdit} />
        <Route
          exact
          path={`${match.url}/:id/delete`}
          component={VehicleDelete}
        />

        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}
