import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { LocationState } from "../../type";
import BaseHeader from "../../UI/BaseHeader";
import PageFinances from "../../pages/PageFinances";

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
      <BaseHeader className={"container-narrow"} />

      <Switch location={backgroundLocation || location}>
        <Route exact path={"/"}>
          <PageFinances />
        </Route>
      </Switch>

      {backgroundLocation && addModalsRoutes()}
    </React.Fragment>
  );
}
