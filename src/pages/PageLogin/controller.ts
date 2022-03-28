import { Dispatch, SetStateAction, useContext, useState } from "react";
import axios from "axios";
import { InputLogin } from "providers/api/LoginProvider/types";
import providers from "providers";
import { LocalStorageKey } from "consts";
import StorageManager from "utils/StorageManager";
import { userAction } from "context/AuthUserContext/consts";
import { AuthUserContext } from "context/AuthUserContext/AuthUserContext";

type ControllerReturn = [
  login: () => Promise<void>,
  loginErrorMessage: string,
  setLoginFormData: Dispatch<SetStateAction<string>>,
  loginFormData: InputLogin,
  setLoginFormData: Dispatch<SetStateAction<InputLogin>>
];

export default function useController(): ControllerReturn {
  const [loginFormData, setLoginFormData] = useState<InputLogin>({ email: "", password: "" });
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const [_, dispatch] = useContext(AuthUserContext);

  const login = async (): Promise<void> => {
    try {
      const response = await providers.LoginProvider.login(loginFormData);
      StorageManager.setItem(LocalStorageKey.USER_LOGIN_DATA, response);
      dispatch({ type: userAction.SET_USER, payload: response.user });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setLoginErrorMessage(e.response?.data.message);
        throw e;
      }
    }
  };

  return [login, loginErrorMessage, setLoginErrorMessage, loginFormData, setLoginFormData];
}
