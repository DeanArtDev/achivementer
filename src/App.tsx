import React from "react";
import FinancialRouter from "./router/FinancialRouter";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <FinancialRouter />
      {/*<PushManager />*/}
    </Router>
  );
}
