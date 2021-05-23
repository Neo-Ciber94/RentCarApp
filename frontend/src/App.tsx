import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Home from "./pages/main/Home";
import Login from "./pages/main/Login";
import NotFound from "./pages/main/NotFound";
import Reservation from "./pages/common/Reservation";
import Vehicles from "./pages/common/Vehicles";
import { NavbarProvider } from "./context/NavbarContext";
import { withHeaderAndFooter } from "./layout";

// prettier-ignore
const App = () => {
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
};

export default App;
