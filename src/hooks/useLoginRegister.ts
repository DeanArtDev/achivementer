import { useContext, useState } from "react";
import axios from "axios";
import { InputLogin } from "providers/api/LoginProvider/types";
import providers from "providers";
import { LocalStorageKey } from "consts";
import StorageManager from "utils/StorageManager";
import { userAction } from "context/AuthUserContext/consts";
import { AuthUserContext } from "context/AuthUserContext/AuthUserContext";
import { useHistory } from "react-router-dom";
import { LocationState, LoginData } from "../types";
import useRouterHistory from "./useRouterHistory";
import { routePath } from "../router/consts";

export default function useLoginRegister() {
  const [errorMessage, setErrorMessage] = useState("");
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
        setErrorMessage(e.response?.data.message);
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
        setErrorMessage(e.response?.data.message);
        throw e;
      }
    }
  };

  return { login, register, errorMessage, setErrorMessage };
}
