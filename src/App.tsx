import AuthUserContext from "context/AuthUserContext/AuthUserContext";
import React from "react";
import MainRouter from "./router";

export default function App() {
  return (
    <AuthUserContext>
      <MainRouter />
    </AuthUserContext>
  );
}
