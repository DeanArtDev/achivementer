import React, { PropsWithChildren } from "react";
import { Location } from "history";
import {Redirect, Switch} from "react-router-dom";
import useAuthUser from "hooks/useAuthUser";
import useRouterHistory from "hooks/useRouterHistory";
import useQuery from "hooks/useQuery";
import { LocationState } from "../../types";
import { routePath, routeQuery } from "../consts";

type Props = {
  location: Location<LocationState>;
};

export default function PathGuard({ children, location }: PropsWithChildren<Props>) {
  const [authUser] = useAuthUser();
  const { getLocation } = useRouterHistory();
  const query = useQuery();

  if (authUser && query[routeQuery.REDIRECT_PATH]) {
    return <Redirect to={getLocation(query[routeQuery.REDIRECT_PATH])} />;
  }
  if ((authUser && location.pathname === routePath.LOGIN) || location.pathname === "/") {
    return <Redirect to={getLocation(routePath.DEFAULT)} />;
  }

  return <Switch>{children}</Switch>;
}
