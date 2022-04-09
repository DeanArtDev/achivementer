import { useContext } from "react";
import axios from "axios";
import { InputLogin } from "providers/api/LoginProvider/types";
import providers from "providers";
import { GlobalEmit, LocalStorageKey } from "consts";
import StorageManager from "utils/StorageManager";
import emitter, { addPayload } from "utils/emitter";
import { routePath } from "router/consts";
import { userAction } from "context/AuthUserContext/consts";
import { AuthUserContext } from "context/AuthUserContext";
import { useHistory } from "react-router-dom";
import { LocationState, LoginData } from "types";
import useRouterHistory from "./useRouterHistory";

export default function useLoginRegister() {
  const [, dispatch] = useContext(AuthUserContext);

  const history = useHistory<LocationState>();
  const { getLocation, fromPath } = useRouterHistory();

  const saveLoginDataAndRedirect = (loginFormData: LoginData) => {
    StorageManager.setItem(LocalStorageKey.USER_LOGIN_DATA, loginFormData);
    dispatch({ type: userAction.SET_USER, payload: loginFormData.user });
    history.replace(getLocation(fromPath || routePath.DEFAULT));
  };

  const login = async (loginFormData: InputLogin): Promise<void> => {
    try {
      const response = await providers.LoginProvider.login(loginFormData);
      saveLoginDataAndRedirect(response);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        await emitter.emit(GlobalEmit.SHOW_NOTIFICATION, addPayload({ message: e.response?.data.message }));
        throw e;
      }
    }
  };

  const register = async (loginFormData: InputLogin): Promise<void> => {
    try {
      const response = await providers.LoginProvider.register(loginFormData);
      saveLoginDataAndRedirect(response);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        await emitter.emit(GlobalEmit.SHOW_NOTIFICATION, addPayload({ message: e.response?.data.message }));
        throw e;
      }
    }
  };

  return { login, register };
}
