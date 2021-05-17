import "./App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Router>
        <div className="container p-4">
          <h1>Hello World!</h1>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
