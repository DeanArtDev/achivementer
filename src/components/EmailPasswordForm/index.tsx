import React, { MouseEvent, useState } from "react";
import { InputLogin, InputRegister } from "providers/api/LoginProvider/types";
import { KeysValuesType } from "types";
import BaseInput from "UI/BaseInput";
import BaseButton from "UI/BaseButton";
import "./style.scss";

type Props = {
  className?: string;
  textButton: string;
  loading: boolean;
  onSubmit: (loginFormData: InputLogin) => void;
};

export default function EmailPasswordForm({ className, textButton, loading, onSubmit }: Props) {
  const cls = ["email-password-form"];
  if (className) cls.push(className);

  const [loginFormData, setLoginFormData] = useState<InputRegister>({ email: "", password: "" });

  const handleChangeLoginInput = (name: keyof InputRegister, value: KeysValuesType<InputRegister>) => {
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSubmitForm = (evt: MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(loginFormData);
  };

  return (
    <form className={cls.join(" ")} onSubmit={handleSubmitForm}>
      <BaseInput
        className={"email-password-form__input mb-3 pa-3"}
        name={"email"}
        type={"email"}
        value={loginFormData.email}
        disabled={loading}
        onChange={(value) => handleChangeLoginInput("email", value)}
      />
      <BaseInput
        className={"email-password-form__input mb-6 pa-3"}
        name={"password"}
        type={"password"}
        value={loginFormData.password}
        disabled={loading}
        onChange={(value) => handleChangeLoginInput("password", value)}
      />
      <BaseButton className={"ml-auto mr-auto"} type={"submit"} loading={loading}>
        {textButton}
      </BaseButton>
    </form>
  );
}
