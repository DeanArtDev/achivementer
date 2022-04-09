import React from "react";
import { Route } from "react-router-dom";
import { useLocation } from "react-router";
import { LocationState } from "types";
import PrivateRoutes from "./PrivateRoutes";
import PathGuard from "./PathGuard";
import publicRoutes from "./PublicRoutes/config";
import privateRoutes from "./PrivateRoutes/config";

// todo: добавить вложенные пути
export default function MainRouter() {
  const location = useLocation<LocationState>();

  return (
    <PathGuard location={location}>
      {publicRoutes.map(({ path, exact, Component }) => {
        return (
          <Route exact={exact} path={path} key={path}>
            <Component />
          </Route>
        );
      })}

      <PrivateRoutes>
        {privateRoutes.map(({ path, exact, Component }) => {
          return (
            <Route exact={exact} path={path} key={path}>
              <Component />
            </Route>
          );
        })}
      </PrivateRoutes>
    </PathGuard>
  );
}
