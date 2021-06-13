import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageCardRepetition from "../../pages/PageCardRepetition";

export default function MainContentRouterView() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"}>
          <PageCardRepetition />
        </Route>
      </Switch>
    </Router>
  )
}
