import React from "react";
import { InputLogin } from "providers/api/LoginProvider/types";
import emitter, { addPayload } from "utils/emitter";
import { GlobalEmit } from "consts";
import useLoginRegister from "hooks/useLoginRegister";
import useLoading from "hooks/useLoading";
import EmailPasswordForm from "components/EmailPasswordForm";
import BasePage from "UI/BasePage";
import BaseMain from "UI/BaseMain";
import "./style.scss";

/* todo:
 *  [-] добавить вылидацию email
 *  */
export default function PageRegistration() {
  const { register } = useLoginRegister();
  const { loading, setLoading } = useLoading();

  const handleSubmitForm = async (loginFormData: InputLogin): Promise<void> => {
    if (loading) return;
    if (!loginFormData.email || !loginFormData.password) {
      await emitter.emit(GlobalEmit.SHOW_NOTIFICATION, addPayload({ message: "Both fields should be fill" }));
      return;
    }

    try {
      setLoading(true);
      await register(loginFormData);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <BasePage className={"page-register"}>
      <BaseMain className={"page-register__main container-narrow"}>
        <EmailPasswordForm
          className={"ma-auto"}
          loading={loading}
          textButton={"Register"}
          onSubmit={handleSubmitForm}
        />
      </BaseMain>
    </BasePage>
  );
}
