import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { InputLogin } from "providers/api/LoginProvider/types";
import StorageManager from "utils/StorageManager";
import providers from "providers";
import { LocalStorageKey } from "consts";

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

  const login = async (): Promise<void> => {
    try {
      const response = await providers.LoginProvider.login(loginFormData);
      StorageManager.setItem(LocalStorageKey.TOKEN, response.token);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setLoginErrorMessage(e.response?.data.message);
        throw e;
      }
    }
  };

  return [login, loginErrorMessage, setLoginErrorMessage, loginFormData, setLoginFormData];
}
