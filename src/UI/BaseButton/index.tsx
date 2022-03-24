import React, { PropsWithChildren, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { LocationDescriptor } from "history";
import { LocationState } from "../../types";
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
  icon?: boolean;
  className?: string;
  type?: "submit" | "button";
  onClick?: (evt: MouseEvent) => void;
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
  icon,
  type = "button",
}: PropsWithChildren<Props>) {
  const cls = ["base-button"];
  if (className) cls.push(className);
  if (secondary) cls.push("__secondary");
  if (icon) cls.push("__icon");
  if (negative) cls.push("base-button__negative");
  if (positive) cls.push("base-button__positive");
  if (fullWith) cls.push("__full-width");

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
