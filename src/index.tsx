import React from "react";
import ReactDOM from "react-dom";
import disableDevToolsForProductionBuild from "utils/disableDevToolsForProductionBuild";
import App from "./App";
import "./style/index.scss";

disableDevToolsForProductionBuild();

/* todo:
 *  [x] добавить LocalState Manager
 *  [x] добавить логин в api
 *  [x] добавить регистрацию в api
 *  [x] добавить авторизационный токен в api запросы
 *  [-] добавить страницу логина
 *  [-] добавить скрытый роут для регистрации
 *  [-] добавить отображение ошибок с бека UI/UX
 *  [-] добавить публичный и приватные руты
 *  */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
