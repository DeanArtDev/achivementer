import React from "react";
import { RouterConfigItem } from "../types";
import { routePath } from "../consts";
import PageLogin from "../../pages/PageLogin";

const publicRoutes: RouterConfigItem[] = [{ path: routePath.LOGIN, exact: true, Component: () => <PageLogin /> }];

export default publicRoutes;
