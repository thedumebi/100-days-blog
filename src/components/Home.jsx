import React, { useState } from "react";
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Articles from "./Articles";
import Form from "./Form";

function Home() {
  const [isRegistered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function logged(value) {
    setLoggedIn(value);
  }

  function registered(value) {
    setRegistered(value);
  }

  return (
    <div className="container">
      {!loggedIn && <h1>Welcome!</h1>}
      {loggedIn || isRegistered ? (
        <Router>
          <Redirect to="/articles" />
          <Route exact path="/articles">
            <Articles />
          </Route>
        </Router>
      ) : (
        <Router>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Switch>
              <Route exact path="/login">
                <Form isRegistered={() => setRegistered(true)} login={logged} />
              </Route>
              <Route exact path="/register">
                <Form isRegistered={isRegistered} register={registered} />
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default Home;
