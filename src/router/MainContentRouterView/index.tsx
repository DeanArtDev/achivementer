import React from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { LocationState } from "../../type";

import PageCardRepetition from "../../pages/PageCardRepetition";
import ModalAddCard from "../../modals/ModalAddCard";

export default function MainContentRouterView() {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const backgroundLocation = location.state?.location;
  const onCloseModal = () => history.replace(backgroundLocation);

  const addModalsRoutes = () => {
    return (
      <Route exact path={"/add-card"}>
        <ModalAddCard onCloseModal={onCloseModal} />
      </Route>
    );
  };

  return (
    <React.Fragment>
      <Switch location={backgroundLocation || location}>
        <Route exact path={"/"}>
          <PageCardRepetition />
        </Route>
      </Switch>

      {backgroundLocation && addModalsRoutes()}
    </React.Fragment>
  );
}
