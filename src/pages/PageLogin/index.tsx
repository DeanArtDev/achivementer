import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { InputLogin } from "providers/api/LoginProvider/types";
import { LocationState } from "types";
import { routePath } from "router/consts";
import emitter, { addPayload } from "utils/emitter";
import useRouterHistory from "hooks/useRouterHistory";
import useLoginRegister from "hooks/useLoginRegister";
import { GlobalEmit } from "consts";
import EmailPasswordForm from "components/EmailPasswordForm";
import BasePage from "UI/BasePage";
import BaseMain from "UI/BaseMain";
import "./style.scss";

/* todo:
 *  [-] добавить вылидацию email
 *  */
export default function PageLogin() {
  const { getLocation, fromPath } = useRouterHistory();
  const { login } = useLoginRegister();

  const history = useHistory<LocationState>();
  const [loading, setLoading] = useState(false);
  const handleSubmitForm = async (loginFormData: InputLogin): Promise<void> => {
    if (loading) return;
    if (!loginFormData.email || !loginFormData.password) {
      await emitter.emit(GlobalEmit.SHOW_NOTIFICATION, addPayload({ message: "Both fields should be fill" }));
      return;
    }

    try {
      setLoading(true);
      await login(loginFormData);
      history.replace(getLocation(fromPath || routePath.DEFAULT));
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <BasePage className={"page-login"}>
      <BaseMain className={"page-login__main container-narrow"}>
        <EmailPasswordForm className={"ma-auto"} loading={loading} textButton={"Login"} onSubmit={handleSubmitForm} />
      </BaseMain>
    </BasePage>
  );
}
