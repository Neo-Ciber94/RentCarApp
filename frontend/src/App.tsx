import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/main/Home";
import { Login } from "./pages/main/Login";
import NotFound from "./pages/main/NotFound";
import Reservation from "./pages/common/Reservation";
import Vehicles from "./pages/common/Vehicles";
import { NavbarProvider } from "./context/NavbarContext";
import { withHeaderAndFooter } from "./layout";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { AuthContext } from "./context/AuthContext";

const App = observer(() => {
  const [isLoading, setLoading] = useState(false);
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
          <Route path="/" exact component={withHeaderAndFooter(Home)} />
          <Route path="/reservation"component={withHeaderAndFooter(Reservation)}/>
          <Route path="/vehicles" component={withHeaderAndFooter(Vehicles)} />
          <Route path="/login" component={withHeaderAndFooter(Login)} />
          <Route path="*" component={NotFound} />
        </Switch>
      </NavbarProvider>
    </Router>
  );
});

export default App;
