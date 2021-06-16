import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ROLES_ALL, ROLES_ADMIN } from "./config";
import { AuthContext } from "./context/AuthContext";
import { withHeaderAndFooter } from "./layout";
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
import { PrintDataTableProvider } from "./context/PrintDataTableContext";
import Routes from "./routes/Routes";

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
      <PrintDataTableProvider>
        <Router>
          <NavbarProvider>
            <Switch>
              {/* Common routes */}
              <Route path="/" exact component={withHeaderAndFooter(Home)} />
              <Route
                path={Routes.reservations()}
                component={ReservationRoutes}
              />
              <Route path={Routes.vehicles()} component={VehicleRoutes} />
              <Route
                path={Routes.login()}
                component={withHeaderAndFooter(Login, "Login")}
              />

              {/* Employees */}
              <ProtectedRoute
                roles={ROLES_ALL}
                path={Routes.profile()}
                component={ProfileRoutes}
              />

              <ProtectedRoute
                roles={ROLES_ALL}
                path={Routes.clients()}
                component={withHeaderAndFooter(Clients, "Clients")}
              />
              <ProtectedRoute
                roles={ROLES_ALL}
                path={Routes.inspections()}
                component={withHeaderAndFooter(Inspections, "Inspections")}
              />
              <ProtectedRoute
                roles={ROLES_ALL}
                path={Routes.rents()}
                component={RentRoutes}
              />

              {/* Admin */}
              <ProtectedRoute
                roles={ROLES_ADMIN}
                path={Routes.employees()}
                component={EmployeeRoutes}
              />
              <ProtectedRoute
                roles={ROLES_ADMIN}
                path={Routes.brands()}
                component={withHeaderAndFooter(Brands, "Brands")}
              />
              <ProtectedRoute
                roles={ROLES_ADMIN}
                path={Routes.models()}
                component={withHeaderAndFooter(Models, "Models")}
              />
              <ProtectedRoute
                roles={ROLES_ADMIN}
                path={Routes.fuels()}
                component={withHeaderAndFooter(Fuels, "Fuels")}
              />

              {/* 404 */}
              <Route path="*" component={NotFound} />
            </Switch>
          </NavbarProvider>
        </Router>
      </PrintDataTableProvider>
    </QueryClientProvider>
  );
});

export default App;
