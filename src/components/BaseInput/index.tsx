import React from "react";

import "./style.scss";

type Props = {
  className?: string;
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
};

export default function BaseInput({ className, id, type = "text", name, placeholder }: Props) {
  const cls = ["base-input"];
  if (className) cls.push(className);

  if (type === "number") cls.push("base-input--number");

  return <input className={cls.join(" ")} id={id} type={type} name={name} placeholder={placeholder} />;
}
