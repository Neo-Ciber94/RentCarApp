import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ROLES_ALL, ROLES_ADMIN } from "./config";
import { AuthContext } from "./context/AuthContext";
import { withHeaderAndFooter, Routes } from "./layout";
import {
  VehicleRoutes,
  Login,
  Clients,
  Inspections,
  RentRoutes,
  EmployeeRoutes,
  Brands,
  Models,
  Fuels,
  ProfileRoutes,
  ReservationRoutes,
} from "./pages";
import Home from "./pages/common/Home";
import NotFound from "./pages/common/NotFound";
import { ProtectedRoute } from "./components";
import { NavbarProvider } from "./context/NavbarContext";
import { PrintableTableProvider } from "./context/PrintableTableContext";

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
      <PrintableTableProvider>
        <Router>
          <NavbarProvider>
            <Switch>
              {/* Common routes */}
              <Route path="/" exact component={withHeaderAndFooter(Home)} />
              <Route
                path={Routes.reservations.path}
                component={ReservationRoutes}
              />
              <Route path={Routes.vehicles.path} component={VehicleRoutes} />
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
                component={RentRoutes}
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
      </PrintableTableProvider>
    </QueryClientProvider>
  );
});

export default App;
