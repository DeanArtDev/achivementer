import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthUserContext from "context/AuthUserContext/AuthUserContext";
import PortalTarget from "components/PortalTarget";
import MainRouter from "./router";

export default function App() {
  return (
    <Fragment>
      <Router>
        <AuthUserContext>
          <MainRouter />
        </AuthUserContext>
      </Router>
      <PortalTarget />
    </Fragment>
  );
}
