import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Footer, Header } from "src/layout";
import { Brands } from "./Brands";

export function BrandRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Header title="Brands" />
      <Switch>
        <Route exact path={match.url} component={Brands} />
      </Switch>
      <Footer />
    </>
  );
}
