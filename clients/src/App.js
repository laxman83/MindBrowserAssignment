import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Home from "./Components/home.component";
import Login from "./Components/login.component";
import SignUp from "./Components/signup.component";

import Navbar from "./Components/navbar.component";

function PrivateRoute({ component: Component, authed, ...rest }) {
  let tokenData = Navbar.Token();

  return (
    <Route
      {...rest}
      render={(props) =>
        tokenData ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/sign-in", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />

              <PrivateRoute path="/home" component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
