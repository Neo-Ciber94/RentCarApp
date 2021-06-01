import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Footer, Header } from "src/layout";
import { RentCreate } from "./RentCreate";
import { RentDelete } from "./RentDelete";
import { RentDetails } from "./RentDetails";
import { RentEdit } from "./RentEdit";
import { Rents } from "./Rents";

export function RentRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Header />
      <Switch>
        <Route exact path={match.url} component={Rents} />
        <Route exact path={`${match.url}/new`} component={RentCreate} />
        <Route exact path={`${match.url}/:id`} component={RentDetails} />
        <Route exact path={`${match.url}/:id/edit`} component={RentEdit} />
        <Route exact path={`${match.url}/:id/delete`} component={RentDelete} />
      </Switch>
      <Footer />
    </>
  );
}
