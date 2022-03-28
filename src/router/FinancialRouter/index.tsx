import React from "react";
import { Route, Switch } from "react-router-dom";
import { financialRoute } from "./consts";
import PageFinances from "pages/PageFinances";
import PageFinancialCorrector from "pages/PageFinancialCorrector";

export default function FinancialRouter() {
  return (
    <Switch>
      <Route exact path={financialRoute.PAGE}>
        <PageFinances />
      </Route>
      <Route exact path={financialRoute.FINANCIAL_CORRECTOR + "/:id"}>
        <PageFinancialCorrector />
      </Route>
    </Switch>
  );
}
