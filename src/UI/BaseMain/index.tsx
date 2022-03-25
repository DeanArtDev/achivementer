import React, { PropsWithChildren } from "react";
import "./style.scss";

interface Props {
  className?: string;
}
export default function BaseMain({ children, className }: PropsWithChildren<Props>) {
  const cls = ["base-main"];
  if (className) cls.push(className);

  return <main className={cls.join(" ")}>{children}</main>;
}
