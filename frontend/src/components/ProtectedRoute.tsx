import { UserRole } from "@shared/types";
import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import { observer } from "mobx-react-lite";
import { Redirect, Route } from "react-router";
import { Routes } from "src/layout";
import { RouteProps } from "react-router-dom";

type LoginOrNotFound = "login" | "notfound";

export interface ProtectedRouteProps extends RouteProps {
  roles: UserRole[];
  redirectTo?: LoginOrNotFound;
}

export const ProtectedRoute = observer<ProtectedRouteProps>(
  ({ roles, children, ...rest }) => {
    if (roles.length === 0) {
      console.warn("No roles for protected route");
    }

    const authService = useContext(AuthContext);
    const user = authService.currentUser;

    // If the route contains a component
    if (rest.component) {
      if (user && roles.includes(user.role)) {
        return <Route {...rest} />;
      } else {
        return <RedirectToRoute to={rest.redirectTo} />;
      }
    }

    // Otherwise returns a render
    return (
      <Route
        {...rest}
        render={() => {
          // Render children
          if (user && roles.includes(user.role)) {
            return children;
          } else {
            return <RedirectToRoute to={rest.redirectTo} />;
          }
        }}
      />
    );
  }
);

function RedirectToRoute(props: { to?: LoginOrNotFound }) {
  // Redirect to login
  // TODO: Redirect to 404 instead?
  return (
    <Redirect
      to={{
        pathname: "/login",
        state: Routes.login.name,
      }}
    />
  );
}
