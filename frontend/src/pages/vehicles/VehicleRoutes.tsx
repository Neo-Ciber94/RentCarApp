import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Footer, Header } from "src/layout";
import NotFound from "../common/NotFound";

export function VehicleRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Header title="Vehicles" />
      <Switch>
        <Route exact path={match.url} />
        <Route exact path={`${match.url}/new`} />
        <Route exact path={`${match.url}/:id`} />
        <Route exact path={`${match.url}/:id/edit`} />
        <Route exact path={`${match.url}/:id/delete`} />

        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}
