import React from "react";
import { PropsWithChildren } from "react";
import { Redirect, Switch } from "react-router-dom";
import useAuthUser from "hooks/useAuthUser";
import useRouterHistory from "hooks/useRouterHistory";
import { routePath } from "../consts";

export default function PrivateRoutes({ children }: PropsWithChildren<unknown>) {
  const [authUser] = useAuthUser();
  const { getLocation } = useRouterHistory();

  if (authUser) return <Switch>{children}</Switch>;

  return <Redirect to={getLocation(routePath.LOGIN)} />;
}
