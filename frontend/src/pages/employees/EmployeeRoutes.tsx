import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Header, Footer } from "src/layout";
import { EmployeeCreate, EmployeeDetails } from ".";
import NotFound from "../common/NotFound";
import { EmployeeEdit } from "./EmployeeEdit";
import { Employees } from "./Employess";

export function EmployeeRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Header title="Employees" />
      <Switch>
        <Route exact path={`${match.url}`} component={Employees} />
        <Route exact path={`${match.url}/new`} component={EmployeeCreate} />
        <Route exact path={`${match.url}/:id`} component={EmployeeDetails} />
        <Route exact path={`${match.url}/:id/edit`} component={EmployeeEdit} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}
