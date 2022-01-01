import React, { PropsWithChildren } from "react";

import "./style.scss";

type Props = {
  className?: string;
};

export default function BaseHeader({ children, className }: PropsWithChildren<Props>) {
  const cls = ["base-header"];
  if (className) cls.push(className);

  return <header className={cls.join(" ")}>{children}</header>;
}
