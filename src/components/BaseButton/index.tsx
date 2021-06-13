import React, { PropsWithChildren } from "react";
import BasePreloader from "../BasePreloader";
import "./style.scss";

interface Props {
  secondary?: boolean;
  negative?: boolean;
  positive?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "button";
}

export default function BaseButton({
  children,
  secondary,
  negative,
  positive,
  loading,
  disabled,
  className,
  type = "button",
}: PropsWithChildren<Props>) {
  const cls = ["base-button"];
  if (className) cls.push(className);
  if (secondary) cls.push("base-button__secondary");
  if (negative) cls.push("base-button__negative");
  if (positive) cls.push("base-button__positive");

  return (
    <button className={cls.join(" ")} type={type} disabled={disabled}>
      {loading && <BasePreloader size="30"/>}
      {!loading && children}
    </button>
  );
}
