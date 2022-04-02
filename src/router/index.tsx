import React from "react";
import { Route, Switch } from "react-router-dom";
import PageLogin from "pages/PageLogin";
import { route } from "./consts";
import PrivateRoutes from "./PrivateRoutes";
import FinancialRouter from "./FinancialRouter";
import PathGuard from "./PathGuard";

// todo: переписать через конфиг
export default function MainRouter() {
  return (
    <PathGuard>
      <Switch>
        <Route exact path={route.LOGIN}>
          <PageLogin />
        </Route>

        <PrivateRoutes>
          <Switch>
            <Route path={"/finances"}>
              <FinancialRouter />
            </Route>
            <Route path={"*"}>
              <div>ERROR</div>
            </Route>
          </Switch>
        </PrivateRoutes>
      </Switch>
    </PathGuard>
  );
}
