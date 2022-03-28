import React from "react";
import { Route, Switch } from "react-router-dom";
import PageLogin from "pages/PageLogin";
import { route } from "./consts";
import PrivateRoutes from "./PrivateRoutes";
import FinancialRouter from "./FinancialRouter";
import PathGuard from "./PathGuard";

export default function MainRouter() {
  return (
    <PathGuard>
      <Switch>
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
  );
}
