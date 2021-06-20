import React from "react";
import MainContentRouterView from "./router/MainContentRouterView";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
        <MainContentRouterView />
        {/*<PushManager />*/}
    </Router>
  );
}
