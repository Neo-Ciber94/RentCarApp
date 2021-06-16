import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Footer, Header } from "src/layout";
import Routes from "src/routes/Routes";
import NotFound from "../common/NotFound";
import { RentCreate } from "./RentCreate";
// import { RentDelete } from "./RentDelete";
import { RentDetails } from "./RentDetails";
import { RentEdit } from "./RentEdit";
import { RentReturn } from "./RentReturn";
import { Rents } from "./Rents";

export function RentRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Header title="Rents" />
      <Switch>
        <Route exact path={match.url} component={Rents} />
        <Route
          exact
          path={Routes.join(match.url, "new")}
          component={RentCreate}
        />
        <Route
          exact
          path={Routes.join(match.url, ":id")}
          component={RentDetails}
        />
        <Route
          exact
          path={Routes.join(match.url, ":id", "edit")}
          component={RentEdit}
        />
        {/* <Route exact path={`${match.url}/:id/delete`} component={RentDelete} /> */}
        <Route
          exact
          path={Routes.join(match.url, ":id", "return")}
          component={RentReturn}
        />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}
