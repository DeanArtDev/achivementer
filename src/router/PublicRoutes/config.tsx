import React from "react";
import PageLogin from "pages/PageLogin";
import { RouterConfigItem } from "../types";
import { routePath } from "../consts";

const publicRoutes: RouterConfigItem[] = [{ path: routePath.LOGIN, exact: true, Component: () => <PageLogin /> }];

export default publicRoutes;
