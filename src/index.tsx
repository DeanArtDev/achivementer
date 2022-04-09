import React from "react";
import ReactDOM from "react-dom";
import disableDevToolsForProductionBuild from "utils/disableDevToolsForProductionBuild";
import App from "./App";
import "./style/index.scss";

disableDevToolsForProductionBuild();

/* todo:
 *  [-] добавить скрытый роут для регистрации
 *  [-] [error exception] добавить в api глобальный отлов ошибок через глобальню шину данных
 *  [-] [error exception] добавить в api отключение вывода глобальных
 *  */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
