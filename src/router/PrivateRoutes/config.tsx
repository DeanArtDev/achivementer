import React from "react";
import { RouterConfigItem } from "../types";
import { routePath } from "../consts";
import PageFinances from "../../pages/PageFinances";
import PageFinancialCorrector from "pages/PageFinancialCorrector";

const privateRoutes: RouterConfigItem[] = [
  { path: routePath.DEFAULT, exact: true, Component: () => <PageFinances /> },
  { path: routePath.FINANCES_CORRECTOR, exact: true, Component: () => <PageFinancialCorrector /> },
  { path: routePath.ANY, exact: true, Component: () => <div>ERROR</div> },
];

export default privateRoutes;
