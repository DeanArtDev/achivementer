import React, { PropsWithChildren } from "react";
import "./style.scss";

interface Props {
  className?: string;
}
export default function BasePage({ children, className }: PropsWithChildren<Props>) {
  const cls = ["base-page"];
  if (className) cls.push(className);

  return <div className={cls.join(" ")}>{children}</div>;
}
