import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import StorageManager from "utils/StorageManager";
import useRouterHistory from "hooks/useRouterHistory";
import { routePath } from "router/consts";
import { AuthUserContext } from "context/AuthUserContext";
import { userAction } from "context/AuthUserContext/consts";
import { LocalStorageKey } from "consts";

export default function PageLogout() {
  const history = useHistory();
  const { getLocation } = useRouterHistory();
  const [, dispatch] = useContext(AuthUserContext);

  useEffect(() => {
    StorageManager.removeItem([LocalStorageKey.USER_LOGIN_DATA]);
    dispatch({ type: userAction.SET_USER, payload: null });
    history.push(getLocation(routePath.LOGIN));
  });

  return null;
}
