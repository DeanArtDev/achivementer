import React from "react";
import { InputLogin } from "providers/api/LoginProvider/types";
import useLoginRegister from "hooks/useLoginRegister";
import useLoading from "hooks/useLoading";
import EmailPasswordForm from "components/EmailPasswordForm";
import BasePage from "UI/BasePage";
import BaseMain from "UI/BaseMain";
import "./style.scss";
import ErrorMessageModal from "../../components/ErrorMessage";

/* todo:
 *  [-] добавить вылидацию email
 *  [-] добавить глобальную обработку ошибок
 *  */
export default function PageRegistration() {
  const { register, errorMessage, setErrorMessage } = useLoginRegister();
  const { loading, setLoading } = useLoading();

  const handleSubmitForm = async (loginFormData: InputLogin): Promise<void> => {
    if (loading) return;
    if (!loginFormData.email || !loginFormData.password) {
      setErrorMessage("Both fields should be fill");
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

        {errorMessage && <ErrorMessageModal message={errorMessage} onCloseError={() => setErrorMessage("")} />}
      </BaseMain>
    </BasePage>
  );
}
