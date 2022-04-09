import React, { ChangeEvent, useEffect } from "react";
import { InputValidationOptions } from "types";
import { ButtonTypes } from "./types";
import useInputValidate from "./hooks/useInputValidate";

import "./style.scss";

type Props = {
  id?: string;
  name: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  type?: ButtonTypes;
  placeholder?: string;
  inputValidateOptions?: InputValidationOptions;
  onChange?: (value: string) => void;
  onValidCheck?: (isValid: boolean) => void;
};

export default function BaseInput({
  className,
  name,
  value = "",
  type = "text",
  inputValidateOptions,
  onValidCheck,
  disabled,
  onChange,
  ...props
}: Props) {
  const cls = ["base-input"];
  const { isValid, isShowError, isCanChangeField } = useInputValidate(value, name, inputValidateOptions);

  if (className) cls.push(className);
  if (isShowError) cls.push("__invalid");
  if (type === "number") cls.push("base-input--number");
  if (disabled) cls.push("__disabled");

  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();
    if (isCanChangeField(value)) {
      onChange && onChange(value);
    }
  };

  useEffect(() => {
    onValidCheck && onValidCheck(isValid);
  }, [isValid]);

  return (
    <input
      className={cls.join(" ")}
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      {...props}
      onChange={handleChangeInput}
    />
  );
}
