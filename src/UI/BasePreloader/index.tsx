import React from "react";
import { ReactComponent as PreloaderIcon } from "assets/images/icons/preloader.svg";
import "./style.scss";

interface Props {
  className?: string;
  size?: string | number;
  color?: string;
  preloaderRef?: React.RefObject<HTMLDivElement>;
}

export default function BasePreloader({ className, color = "var(--palette-fg)", size = "30", preloaderRef }: Props) {
  const cls = ["preloader"];

  if (className) cls.push(className);

  return (
    <div className={cls.join(" ")} ref={preloaderRef}>
      <PreloaderIcon width={size} height={size} fill={color} />
    </div>
  );
}
