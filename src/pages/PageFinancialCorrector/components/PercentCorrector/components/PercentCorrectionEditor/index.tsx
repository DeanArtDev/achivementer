import React, { useState } from "react";
import { useEffectOnce } from "react-use";
import { FinancialPercentCorrection } from "providers/api/FinancialReportProvider/types";
import { InputCreateCorrection } from "providers/api/CorrectionProvider/types";
import { KeysValuesType } from "types";
import { Regexp } from "consts";
import { ReactComponent as CheckIcon } from "assets/images/icons/check.svg";
import { ReactComponent as CloseCrossIcon } from "assets/images/icons/close-cross.svg";
import BaseInput from "UI/BaseInput";
import BaseButton from "UI/BaseButton";
import "./style.scss";

type Props = {
  className?: string;
  correction?: FinancialPercentCorrection;
  onAccept?: (correction: FinancialPercentCorrection | InputCreateCorrection) => void;
  onDecline?: () => void;
};

type LocalCorrection = FinancialPercentCorrection | InputCreateCorrection | null;

const ICON_SIZE = 26;

export default function PercentCorrectionEditor({ className, correction, onAccept, onDecline }: Props) {
  const cls = ["corrector-editor"];
  if (className) cls.push(className);
  const [localCorrection, setLocalCorrection] = useState<LocalCorrection>(null);

  const handleInputChange = (
    name: keyof FinancialPercentCorrection,
    value: KeysValuesType<FinancialPercentCorrection>
  ): void => {
    if (localCorrection) return setLocalCorrection({ ...localCorrection, [name]: value });
    setLocalCorrection({ name: "", amount: "", ...{ [name]: value } });
  };

  const handleButtonAccept = () => {
    setLocalCorrection(null);
    onAccept && localCorrection && onAccept(localCorrection);
  };

  const handleButtonDecline = () => {
    setLocalCorrection(null);
    onDecline && onDecline();
  };

  useEffectOnce(() => {
    if (correction) setLocalCorrection(correction);
  });

  return (
    <div className={cls.join(" ")}>
      <BaseInput
        className={"corrector-editor__input-name pa-2"}
        value={localCorrection?.name ?? ""}
        name={"correctionName"}
        type={"text"}
        placeholder={"Correction name"}
        onChange={(v) => handleInputChange("name", v)}
      />
      <BaseInput
        className={"corrector-editor__input-amount pa-2"}
        value={localCorrection?.amount ?? ""}
        name={"correctionAmount"}
        type={"text"}
        placeholder={"Amount"}
        inputValidateOptions={{ regexp: Regexp.NUMERIC }}
        onChange={(v) => handleInputChange("amount", v)}
      />

      <BaseButton className={"corrector-editor__btn"} icon disabled={!localCorrection} onClick={handleButtonAccept}>
        <CheckIcon className={"corrector-editor__icon-accept"} width={ICON_SIZE} height={ICON_SIZE} />
      </BaseButton>
      <BaseButton className={"corrector-editor__btn"} icon onClick={handleButtonDecline}>
        <CloseCrossIcon className={"corrector-editor__icon-decline"} width={ICON_SIZE} height={ICON_SIZE} />
      </BaseButton>
    </div>
  );
}
