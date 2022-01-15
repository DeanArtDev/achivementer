import React, { ChangeEvent, useEffect } from "react";
import { InputValidationOptions, Predicate } from "type";
import useInputValidate from "./hooks/useInputValidate";

import "./style.scss";

const getNamedCallback = (name: string, cb: Predicate) => {
  return Object.defineProperty(cb, "name", { value: name, writable: true });
};

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
  const [isValid, isShowError, isCanChangeField, validatingCallback] = useInputValidate(value, inputValidateOptions);

  if (className) cls.push(className);
  if (isShowError) cls.push("__invalid");
  if (type === "number") cls.push("base-input--number");

  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (isCanChangeField(value)) {
      onChange && onChange(value);
    }
  };

  useEffect(() => {
    setValidationCallback && setValidationCallback(getNamedCallback(name, validatingCallback));
  }, [isValid]);


  return (
    <input className={cls.join(" ")} type={type} value={value} name={name} {...props} onChange={handleChangeInput} />
  );
}
