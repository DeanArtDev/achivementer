import React from "react";
import { ReactComponent as CrossIcon } from "assets/images/icons/close-cross.svg";
import BaseButton from "UI/BaseButton";
import "./style.scss";

type Props = {
  className?: string;
  onClick?: () => void;
};

const ICON_SIZE = 32;

export default function AddPercentCorrection({ className, onClick }: Props) {
  const cls = ["add-corrector"];
  if (className) cls.push(className);

  return (
    <BaseButton className={cls.join(" ")} icon fullWith onClick={() => onClick && onClick()}>
      <CrossIcon className={"add-corrector__icon"} width={ICON_SIZE} height={ICON_SIZE} />
    </BaseButton>
  );
}
