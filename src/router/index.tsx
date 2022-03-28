import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, useLocation } from "react-router-dom";
import { LocationState } from "types";
import PageLogin from "pages/PageLogin";
import { route } from "./consts";
import PrivateRoutes from "./PrivateRoutes";
import FinancialRouter from "./FinancialRouter";
import PathGuard from "./PathGuard";

export default function MainRouter() {
  const location = useLocation<LocationState>();

  return (
    <Router>
      <PathGuard>
        <Switch location={location}>
          <Route exact path={route.LOGIN}>
            <PageLogin />
          </Route>

          <PrivateRoutes>
            <Route path={"/finances"}>
              <FinancialRouter />
            </Route>
            <Route path={"*"}>
              <div>ERROR</div>
            </Route>
          </PrivateRoutes>
        </Switch>
      </PathGuard>
    </Router>
  );
}
