import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthUserContext from "context/AuthUserContext/AuthUserContext";
import MainRouter from "./router";

export default function App() {
  return (
    <Router>
      <AuthUserContext>
        <MainRouter />
      </AuthUserContext>
    </Router>
  );
}
