import React, { PropsWithChildren } from "react";
import { Redirect, Route } from "react-router-dom";
import { PathProps } from "types";
import useAuthUser from "hooks/useAuthUser";
import useRouterHistory from "hooks/useRouterHistory";
import useQuery from "hooks/useQuery";
import { route, routeQuery } from "../consts";

export default function PathGuard({ children }: PropsWithChildren<unknown>) {
  const [authUser] = useAuthUser();
  const { getLocation } = useRouterHistory();
  const query = useQuery();

  const pathGuard = ({ location }: PathProps) => {
    if (authUser && query[routeQuery.REDIRECT_PATH]) {
      return <Redirect to={getLocation(query[routeQuery.REDIRECT_PATH])} />;
    }
    if ((authUser && location.pathname === route.LOGIN) || location.pathname === "/") {
      return <Redirect to={getLocation(route.DEFAULT)} />;
    }

    return children;
  };

  return <Route>{pathGuard}</Route>;
}
