import React, { ChangeEvent } from "react";

import "./style.scss";

type Props = {
  className?: string;
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string) => void;
};

export default function BaseInput({ className, type = "text", onChange, ...props }: Props) {
  const cls = ["base-input"];
  if (className) cls.push(className);

  if (type === "number") cls.push("base-input--number");

  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(evt.target.value);
  };

  return <input className={cls.join(" ")} type={type} {...props} onChange={handleChangeInput} />;
}
