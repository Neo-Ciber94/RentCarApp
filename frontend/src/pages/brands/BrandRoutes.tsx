import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Footer, Header } from "src/layout";
import { AddBrand } from "./AddBrand";
import { Brands } from "./Brands";

export function BrandRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Header />
      <Switch>
        <Route exact path={match.url} component={Brands} />
        <Route exact path={`${match.url}/new`} component={AddBrand} />
        <Route exact path={`${match.url}/:id/edit`} component={AddBrand} />
      </Switch>
      <Footer />
    </>
  );
}
