import { Route, Switch } from "react-router-dom";
import { Footer, Header } from "src/layout";
import { ChangePassword } from "./ChangePassword";
import { EditProfile } from "./EditProfile";
import { Profile } from "./Profile";

export function ProfileRoutes() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="" component={Profile} />
        <Route exact path="/profile/edit" component={EditProfile} />
        <Route
          exact
          path="/profile/changepassword"
          component={ChangePassword}
        />
      </Switch>
      <Footer />
    </>
  );
}
