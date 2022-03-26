import React from "react";
import ReactDOM from "react-dom";
import disableDevToolsForProductionBuild from "utils/disableDevToolsForProductionBuild";
import App from "./App";

import "./style/index.scss";

disableDevToolsForProductionBuild();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
