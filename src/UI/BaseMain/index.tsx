import React, { PropsWithChildren } from "react";
import BasePreloader from "../BasePreloader";
import "./style.scss";

interface Props {
  className?: string;
  loading?: boolean;
}
export default function BaseMain({ children, loading, className }: PropsWithChildren<Props>) {
  const cls = ["base-main"];
  if (className) cls.push(className);

  return <main className={cls.join(" ")}>{loading ? <BasePreloader size={70} /> : children}</main>;
}
