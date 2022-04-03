import React, { MouseEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { InputLogin } from "providers/api/LoginProvider/types";
import {KeysValuesType, LocationState} from "types";
import useRouterHistory from "hooks/useRouterHistory";
import { routePath } from "router/consts";
import useController from "./controller";
import BasePage from "UI/BasePage";
import BaseMain from "UI/BaseMain";
import BaseInput from "UI/BaseInput";
import BaseButton from "UI/BaseButton";
import "./style.scss";

/* todo:
 *  [-] добавить вылидацию email
 *  [-] добавить глобальную обработку ошибок
 *  */
export default function PageLogin() {
  const { getLocation, fromPath } = useRouterHistory();
  const [login, loginErrorMessage, setLoginErrorMessage, loginFormData, setLoginFormData] = useController();

  const history = useHistory<LocationState>();
  const [loading, setLoading] = useState(false);
  const handleSubmitForm = async (evt: MouseEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      await login();
      history.replace(getLocation(fromPath || routePath.DEFAULT));
    } catch (e) {
      setLoading(false);
    }
  };

  const handleClickPage = () => loginErrorMessage && setLoginErrorMessage("");

  const handleChangeLoginInput = (name: keyof InputLogin, value: KeysValuesType<InputLogin>) => {
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  return (
    <BasePage className={"page-login"} onClick={handleClickPage}>
      <BaseMain className={"page-login__main container-narrow"}>
        <form className={"page-login__form ma-auto"} onSubmit={handleSubmitForm}>
          <BaseInput
            className={"page-login_input mb-3 pa-3"}
            name={"email"}
            type={"email"}
            value={loginFormData.email}
            disabled={loading}
            onChange={(value) => handleChangeLoginInput("email", value)}
          />
          <BaseInput
            className={"page-login_input mb-6 pa-3"}
            name={"password"}
            type={"password"}
            value={loginFormData.password}
            disabled={loading}
            onChange={(value) => handleChangeLoginInput("password", value)}
          />
          <BaseButton className={"ml-auto mr-auto"} type={"submit"} loading={loading}>
            Login
          </BaseButton>
        </form>

        {loginErrorMessage && <div className={"page-login__error-message"}>{loginErrorMessage}</div>}
      </BaseMain>
    </BasePage>
  );
}
