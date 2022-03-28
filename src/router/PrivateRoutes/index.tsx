import React from "react";
import { PropsWithChildren } from "react";
import { Redirect, Route } from "react-router-dom";
import useAuthUser from "hooks/useAuthUser";
import useRouterHistory from "hooks/useRouterHistory";
import { route } from "../consts";

export default function PrivateRoutes({ children }: PropsWithChildren<unknown>) {
  const [authUser] = useAuthUser();
  const { getLocation } = useRouterHistory();

  const checkPrivatePath = () => {
    if (authUser) return children;
    return <Redirect to={getLocation(route.LOGIN)} />;
  };

  return <Route>{checkPrivatePath}</Route>;
}
