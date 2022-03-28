import React from "react";
import { Switch, Route, useLocation, Link, Redirect } from "react-router-dom";
import { LocationState } from "types";
import { financialRoute } from "./consts";
import PageFinances from "pages/PageFinances";
import PageFinancialCorrector from "pages/PageFinancialCorrector";
import PageLogin from "pages/PageLogin";

//todo: [-] продумать руты, логин на home все остальное по своим местам
//todo: [-] если залогинен то редирект на home
export default function FinancialRouter() {
  const location = useLocation<LocationState>();

  return (
    <React.Fragment>
      <Switch location={location}>
        <Route exact path={"/login"}>
          <PageLogin/>
        </Route>
        <Route exact path={"/"}>
          <Link to={"/finances"}>GO!</Link>
        </Route>
        <Route exact path={financialRoute.PAGE}>
          <PageFinances />
        </Route>
        <Route exact path={financialRoute.FINANCIAL_CORRECTOR + "/:id"}>
          <PageFinancialCorrector />
        </Route>
        <Route>
          <Redirect to={"/"} />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
