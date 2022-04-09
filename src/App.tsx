import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthUserContext from "context/AuthUserContext";
import LoadingContext from "context/LoadingContext";
import PortalTarget from "components/PortalTarget";
import NotificationManager from "components/NotificationManager";
import MainRouter from "./router";

export default function App() {
  return (
    <Fragment>
      <Router>
        <LoadingContext>
          <AuthUserContext>
            <MainRouter />
          </AuthUserContext>
        </LoadingContext>
      </Router>

      <NotificationManager />
      <PortalTarget />
    </Fragment>
  );
}
