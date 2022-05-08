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
  getValidate?: (validate: (value?: string) => boolean) => void;
};

export default function BaseInput({
  className,
  name,
  value = "",
  type = "text",
  disabled,
  inputValidateOptions,
  getValidate,
  onChange,
  ...props
}: Props) {
  const cls = ["base-input"];
  const { isShowError, setIsShowError, validate } = useInputValidate(value, inputValidateOptions);

  if (className) cls.push(className);
  if (isShowError) cls.push("__invalid");
  if (type === "number") cls.push("base-input--number");
  if (disabled) cls.push("__disabled");

  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (validate(value) || value === "") {
      setIsShowError(value === "");
      onChange && onChange(value);
    }
  };

  useEffect(() => {
    getValidate && getValidate(validate);
  }, [value]);

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
