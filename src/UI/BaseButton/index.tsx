import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { LocationDescriptor } from "history";
import { LocationState } from "../../type";
import BasePreloader from "../BasePreloader";

import "./style.scss";

interface Props {
  to?: LocationDescriptor<LocationState>;
  secondary?: boolean;
  transparent?: boolean;
  negative?: boolean;
  positive?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWith?: boolean;
  className?: string;
  type?: "submit" | "button";
  onClick?: (evt: React.MouseEvent) => void;
}

export default function BaseButton({
  to,
  onClick,
  children,
  secondary,
  negative,
  positive,
  loading,
  disabled,
  className,
  fullWith,
  type = "button",
}: PropsWithChildren<Props>) {
  const cls = ["base-button"];
  if (className) cls.push(className);
  if (secondary) cls.push("base-button--secondary");
  if (negative) cls.push("base-button__negative");
  if (positive) cls.push("base-button__positive");
  if (fullWith) cls.push("base-button--full-width");

  if (to) {
    return (
      <Link className={cls.join(" ")} to={to}>
        {children}
      </Link>
    );
  }

  const preloaderColor = secondary ? "var(--palette-bg)" : "";

  const onClickHandler = (evt: React.MouseEvent) => {
    if (onClick && !loading && !disabled) {
      onClick(evt);
    }
  };

  return (
    <button className={cls.join(" ")} type={type} disabled={disabled} onClick={onClickHandler}>
      {loading && <BasePreloader size={24} color={preloaderColor} />}
      {!loading && children}
    </button>
  );
}
