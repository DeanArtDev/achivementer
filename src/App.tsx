import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Link to="/">Logo</Link>

      <Switch>
        <Route exact path="/">
          <div className="mt-8">Hello</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
