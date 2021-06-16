import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Footer, Header } from "src/layout";
import Routes from "src/routes/Routes";
import NotFound from "../common/NotFound";
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
        <Route exact path={Routes.join(match.url, "edit")} component={EditProfile} />
        <Route exact path={Routes.join(match.url, "changepassword")} component={ChangePassword} />
        <Route path="*" component={NotFound}/>
      </Switch>
      <Footer />
    </>
  );
}
