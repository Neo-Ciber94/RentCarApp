import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Footer, Header } from "src/layout";
import { InspectionCreate } from "./InspectionCreate";
import { InspectionDelete } from "./InspectionDelete";
import { InspectionDetails } from "./InspectionDetails";
import { InspectionEdit } from "./InspectionEdit";
import { Inspections } from "./Inspections";

export function InspectionRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Header title="Inspections" />
      <Switch>
        <Route exact path={match.url} component={Inspections} />
        <Route exact path={`${match.url}/new`} component={InspectionCreate} />
        <Route exact path={`${match.url}/:id`} component={InspectionDetails} />
        <Route
          exact
          path={`${match.url}/:id/edit`}
          component={InspectionEdit}
        />
        <Route
          exact
          path={`${match.url}/:id/delete`}
          component={InspectionDelete}
        />
      </Switch>
      <Footer />
    </>
  );
}
