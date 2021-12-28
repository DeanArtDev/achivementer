import React from "react";
import FinanceRouter from "./router/FinanceRouter";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <FinanceRouter />
      {/*<PushManager />*/}
    </Router>
  );
}
