import "./App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/main/Home";
import Login from "./pages/main/Login";

function App() {
  return (
    <Router>
      <Header />
      <div className="p-4">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
