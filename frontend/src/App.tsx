import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/common/Home";
import { Login } from "./pages/common/Login";
import NotFound from "./pages/common/NotFound";
import Reservation from "./pages/reservations/Reservation";
import Vehicles from "./pages/vehicles/Vehicles";
import { NavbarProvider } from "./context/NavbarContext";
import { Routes, withHeaderAndFooter } from "./layout";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { AuthContext } from "./context/AuthContext";
import { Profile } from "./pages/profile/Profile";
import { Clients } from "./pages/clients/Clients";
import { Inspections } from "./pages/inspections/Inspections";
import { Rents } from "./pages/rents/Rents";
import { Employees } from "./pages/employees/Employess";
import { Brands } from "./pages/brands/Brands";
import { Fuels } from "./pages/fuels/Fuels";
import { Models } from "./pages/models/Models";
import { ProtectedRoute } from "./components";
import { UserRole } from "@shared/types";

const ROLES_ALL = [UserRole.Admin, UserRole.Employee];
const ROLES_ADMIN = [UserRole.Admin];

const App = observer(() => {
  const [isLoading, setLoading] = useState(true);
  const authService = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);

    authService.refresh().finally(() => {
      setLoading(false);
    });
  }, [authService]);

  if (isLoading) {
    return <h5>Loading...</h5>;
  }

  // prettier-ignore
  return (
    <Router>
      <NavbarProvider>
        <Switch>
          {/* Common routes */}
          <Route path="/" exact component={withHeaderAndFooter(Home)} />
          <Route path={Routes.reservations.path} component={withHeaderAndFooter(Reservation)}/>
          <Route path={Routes.vehicles.path} component={withHeaderAndFooter(Vehicles)} />
          <Route path={Routes.login.path} component={withHeaderAndFooter(Login)} />

          {/* Employees */}
          <ProtectedRoute roles={ROLES_ALL} path={Routes.profile.path} component={withHeaderAndFooter(Profile)} />
          <ProtectedRoute roles={ROLES_ALL} path={Routes.clients.path} component={withHeaderAndFooter(Clients)} />
          <ProtectedRoute roles={ROLES_ALL} path={Routes.inspections.path} component={withHeaderAndFooter(Inspections)} />
          <ProtectedRoute roles={ROLES_ALL} path={Routes.rent.path} component={withHeaderAndFooter(Rents)} />

          {/* Admin */}
          <ProtectedRoute roles={ROLES_ADMIN} path={Routes.employees.path} component={withHeaderAndFooter(Employees)} />
          <ProtectedRoute roles={ROLES_ADMIN} path={Routes.brands.path} component={withHeaderAndFooter(Brands)} />
          <ProtectedRoute roles={ROLES_ADMIN} path={Routes.models.path} component={withHeaderAndFooter(Models)} />
          <ProtectedRoute roles={ROLES_ADMIN} path={Routes.fuels.path} component={withHeaderAndFooter(Fuels)} />

          {/* 404 */}
          <Route path="*" component={NotFound} />
        </Switch>
      </NavbarProvider>
    </Router>
  );
});

export default App;
