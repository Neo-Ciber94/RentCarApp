import { UserRole } from "@shared/types";
import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import { observer } from "mobx-react-lite";
import { Redirect, Route } from "react-router";
import { Routes } from "src/layout";
import { RouteProps } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
  roles: UserRole[];
}

export const ProtectedRoute = observer<ProtectedRouteProps>(
  ({ roles, children, ...rest }) => {
    if (roles.length === 0) {
      console.warn("No roles for protected route");
    }

    const authService = useContext(AuthContext);
    const user = authService.currentUser;

    return (
      <Route
        {...rest}
        render={() => {
          // Render children
          if (user && roles.includes(user.role)) {
            return <Route>{children}</Route>;
          } else {
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
        }}
      />
    );
  }
);
