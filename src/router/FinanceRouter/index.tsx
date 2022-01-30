import React from "react";
import { Switch, Route, useLocation, Link } from "react-router-dom";
import { LocationState } from "type";
import PageFinances from "pages/PageFinances";

export default function FinanceRouter() {
  const location = useLocation<LocationState>();
  // const history = useHistory();

  const backgroundLocation = location.state?.location;
  // const handleCloseModal = () => history.replace(backgroundLocation);

  const addModalsRoutes = () => {
    return (
      <Route exact path={"/add-card"}>
        <div />
      </Route>
    );
  };

  return (
    <React.Fragment>
      <Switch location={backgroundLocation || location}>
        <Route exact path={"/"}>
          <Link to={"/finances"}>GO!</Link>
        </Route>
        <Route exact path={"/finances"}>
          <PageFinances />
        </Route>
      </Switch>

      {backgroundLocation && addModalsRoutes()}
    </React.Fragment>
  );
}
