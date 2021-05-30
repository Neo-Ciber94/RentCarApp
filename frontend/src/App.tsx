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
import { Clients } from "./pages/clients/Clients";
import { Inspections } from "./pages/inspections/Inspections";
import { Rents } from "./pages/rents/Rents";
import { Fuels } from "./pages/fuels/Fuels";
import { Models } from "./pages/models/Models";
import { ProtectedRoute } from "./components";
import { UserRole } from "@shared/types";
import { ProfileRoutes } from "./pages/profile/ProfileRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Brands, EmployeeRoutes } from "./pages";

const ROLES_ALL = [UserRole.Admin, UserRole.Employee];
const ROLES_ADMIN = [UserRole.Admin];

const queryClient = new QueryClient();

const App = observer(() => {
  const [isLoading, setLoading] = useState(true);
  const authService = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (isMounted) {
      authService
        .refresh()
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    }

    return () => {
      isMounted = false;
    };
  }, [authService]);

  if (isLoading) {
    return <h5 className="p-4 text-lg">Loading...</h5>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavbarProvider>
          <Switch>
            {/* Common routes */}
            <Route path="/" exact component={withHeaderAndFooter(Home)} />
            <Route
              path={Routes.reservations.path}
              component={withHeaderAndFooter(
                Reservation,
                Routes.reservations.name
              )}
            />
            <Route
              path={Routes.vehicles.path}
              component={withHeaderAndFooter(Vehicles, Routes.vehicles.name)}
            />
            <Route
              path={Routes.login.path}
              component={withHeaderAndFooter(Login, Routes.login.name)}
            />

            {/* Employees */}
            <ProtectedRoute
              roles={ROLES_ALL}
              path={Routes.profile.path}
              component={ProfileRoutes}
            />

            <ProtectedRoute
              roles={ROLES_ALL}
              path={Routes.clients.path}
              component={withHeaderAndFooter(Clients, Routes.clients.name)}
            />
            <ProtectedRoute
              roles={ROLES_ALL}
              path={Routes.inspections.path}
              component={withHeaderAndFooter(
                Inspections,
                Routes.inspections.name
              )}
            />
            <ProtectedRoute
              roles={ROLES_ALL}
              path={Routes.rent.path}
              component={withHeaderAndFooter(Rents)}
            />

            {/* Admin */}
            <ProtectedRoute
              roles={ROLES_ADMIN}
              path={Routes.employees.path}
              component={EmployeeRoutes}
            />
            <ProtectedRoute
              roles={ROLES_ADMIN}
              path={Routes.brands.path}
              component={withHeaderAndFooter(Brands, Routes.brands.name)}
            />
            <ProtectedRoute
              roles={ROLES_ADMIN}
              path={Routes.models.path}
              component={withHeaderAndFooter(Models, Routes.models.name)}
            />
            <ProtectedRoute
              roles={ROLES_ADMIN}
              path={Routes.fuels.path}
              component={withHeaderAndFooter(Fuels, Routes.fuels.name)}
            />

            {/* 404 */}
            <Route path="*" component={NotFound} />
          </Switch>
        </NavbarProvider>
      </Router>
    </QueryClientProvider>
  );
});

export default App;
