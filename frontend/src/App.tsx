import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/main/Home";
import Login from "./pages/main/Login";
import NotFound from "./pages/main/NotFound";
import Reservation from "./pages/common/Reservation";
import Vehicles from "./pages/common/Vehicles";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-full">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/reservation" component={Reservation} />
          <Route path="/vehicles" component={Vehicles} />
          <Route path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
