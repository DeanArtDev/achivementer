import React, { PropsWithChildren } from "react";
import "./style.scss";

interface Props {
  className?: string;
  onClick?: () => void;
}
export default function BasePage({ children, className, onClick }: PropsWithChildren<Props>) {
  const cls = ["base-page"];
  if (className) cls.push(className);

  const handlePageClick = () => onClick && onClick();

  return <div className={cls.join(" ")} onClick={handlePageClick}>{children}</div>;
}
