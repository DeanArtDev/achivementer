import React, { ChangeEvent, useEffect } from "react";
import { InputValidationOptions, Predicate } from "type";
import useInputValidate from "./hooks/useInputValidate";

import "./style.scss";

type Props = {
  className?: string;
  id?: string;
  type?: string;
  name: string;
  value?: string;
  placeholder?: string;
  inputValidateOptions?: InputValidationOptions;
  onChange?: (value: string) => void;
  setValidationCallback?: (predicate: Predicate) => void;
};

export default function BaseInput({
  className,
  name,
  value = "",
  type = "text",
  inputValidateOptions,
  setValidationCallback,
  onChange,
  ...props
}: Props) {
  const cls = ["base-input"];
  const [isValid, isShowError, isCanChangeField, validatingCallback] = useInputValidate(
    value,
    name,
    inputValidateOptions
  );

  if (className) cls.push(className);
  if (isShowError) cls.push("__invalid");
  if (type === "number") cls.push("base-input--number");

  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();
    if (isCanChangeField(value)) {
      onChange && onChange(value);
    }
  };

  useEffect(() => {
    setValidationCallback && setValidationCallback(validatingCallback);
  }, [isValid]);

  return (
    <input className={cls.join(" ")} type={type} value={value} name={name} {...props} onChange={handleChangeInput} />
  );
}
