import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { Footer, Header } from "src/layout";
import { ChangePassword } from "./ChangePassword";
import { EditProfile } from "./EditProfile";
import { Profile } from "./Profile";

export function ProfileRoutes() {
  const match = useRouteMatch();

  console.log(match);

  // prettier-ignore
  return (
    <>
      <Header title="Profile" />
      <Switch>
        <Route exact path={match.url} component={Profile} />
        <Route exact path={`${match.url}/edit`} component={EditProfile} />
        <Route exact path={`${match.url}/changepassword`} component={ChangePassword} />
        <Redirect from={match.url} to={match.url} />
      </Switch>
      <Footer />
    </>
  );
}
