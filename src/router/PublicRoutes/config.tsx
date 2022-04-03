import React from "react";
import PageLogin from "pages/PageLogin";
import PageRegistration from "pages/PageRegistration";
import { RouterConfigItem } from "../types";
import { routePath } from "../consts";

const publicRoutes: RouterConfigItem[] = [
    { path: routePath.LOGIN, exact: true, Component: () => <PageLogin /> },
    { path: routePath.REGISTER, exact: true, Component: () => <PageRegistration /> },
];

export default publicRoutes;
