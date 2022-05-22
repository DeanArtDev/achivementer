import React from "react";
import { ReactComponent as CheckIcon } from "assets/images/icons/check.svg";
import { ReactComponent as CloseCrossIcon } from "assets/images/icons/close-cross.svg";
import BaseInput from "UI/BaseInput";
import BaseButton from "UI/BaseButton";
import "./style.scss";

type Props = {
  className?: string;
  onAccept?: () => void;
  onDecline?: () => void;
};

const ICON_SIZE = 26;

export default function PercentCorrectionEditor({ className, onAccept, onDecline }: Props) {
  const cls = ["corrector-editor"];
  if (className) cls.push(className);

  return (
    <div className={cls.join(" ")}>
      <BaseInput className={"corrector-editor__input-name pa-2"} name={"correctionName"} type={"text"} placeholder={"Correction name"} />
      <BaseInput className={"corrector-editor__input-amount pa-2"} name={"correctionAmount"} type={"text"} placeholder={"Amount"} />

      <BaseButton className={"corrector-editor__btn"} icon onClick={() => onAccept && onAccept()}>
        <CheckIcon className={"corrector-editor__icon-accept"} width={ICON_SIZE} height={ICON_SIZE} />
      </BaseButton>
      <BaseButton className={"corrector-editor__btn"} icon onClick={() => onDecline && onDecline()}>
        <CloseCrossIcon className={"corrector-editor__icon-decline"} width={ICON_SIZE} height={ICON_SIZE} />
      </BaseButton>
    </div>
  );
}
