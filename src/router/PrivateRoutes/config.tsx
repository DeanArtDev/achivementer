import React from "react";
import PageFinances from "pages/PageFinances";
import PageFinancialCorrector from "pages/PageFinancialCorrector";
import { RouterConfigItem } from "../types";
import { routePath } from "../consts";

const privateRoutes: RouterConfigItem[] = [
  { path: routePath.DEFAULT, exact: true, Component: () => <PageFinances /> },
  { path: routePath.FINANCES_CORRECTOR, exact: true, Component: () => <PageFinancialCorrector /> },
  { path: routePath.ANY, Component: () => <div>ERROR</div> },
];

export default privateRoutes;
