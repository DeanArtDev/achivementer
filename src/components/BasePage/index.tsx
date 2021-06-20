import React, { PropsWithChildren } from "react";
import BaseHeader from "../BaseHeader";
import "./style.scss";

interface Props {
  className?: string;
}
export default function BasePage({ children, className }: PropsWithChildren<Props>) {
  const cls = ["base-page"];
  if (className) cls.push(className);

  return (
    <React.Fragment>
      <BaseHeader />
      <main className={cls.join(" ")}>{children}</main>
    </React.Fragment>
  );
}
