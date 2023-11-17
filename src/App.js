import "./App.scss";
// import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <Nav></Nav> */}
        <Switch>
          <Route path="/news">News</Route>
          <Route path="/contact">Contact</Route>
          <Route path="/about">About</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            Home
          </Route>
          <Route path="*" exact>
            404 Not Found
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
