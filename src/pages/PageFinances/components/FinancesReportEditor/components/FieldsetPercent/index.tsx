import React from "react";
import { FinancialPercents, FinancialPercentsValue } from "../../../../types";
import { ValidatingCallbacks } from "../../types";
import { isNumericOrVoid } from "utils/predicats";
import { numericToStringAdapter } from "utils/adapters";
import BaseInput from "components/UI/BaseInput";

import "./style.scss";
import useController from "./useController";

type Props = {
  className?: string;
  percents: FinancialPercents;
  getValidationCallbacks?: ValidatingCallbacks;
  onChangePercents: (name: keyof FinancialPercents, value: FinancialPercentsValue) => void;
};

const PERCENT_LIMIT = 100;

export default function FieldsetPercent({ percents, className, getValidationCallbacks, onChangePercents }: Props) {
  const cls = ["fieldset-percent"];
  if (className) cls.push(className);

  const valid = useController(percents, getValidationCallbacks);

  const handleChangeInput = (name: keyof FinancialPercents, value: string): void => {
    if (isNumericOrVoid(value) && Number(value) <= PERCENT_LIMIT) {
      onChangePercents(name, Number(value));
    }
  };

  return (
    <fieldset className={cls.join(" ")}>
      <legend className={"mb-2"}>Percents &quot;%&quot;:</legend>

      <div className={"fieldset-percent__wrapper"}>
        <BaseInput
          className={"fieldset-percent__input pa-3"}
          name="common-percent"
          placeholder={"50"}
          value={numericToStringAdapter(percents.commonPercent)}
          valid={valid.commonPercent}
          onChange={(v) => handleChangeInput("commonPercent", v)}
        />

        <BaseInput
          className={"fieldset-percent__input pa-3"}
          name="piggy-bank-percent"
          placeholder={"20"}
          value={numericToStringAdapter(percents.piggyBankPercent)}
          valid={valid.piggyBankPercent}
          onChange={(v) => handleChangeInput("piggyBankPercent", v)}
        />
        <BaseInput
          className={"fieldset-percent__input pa-3"}
          name="free-percent"
          placeholder={"30"}
          value={numericToStringAdapter(percents.freePercent)}
          valid={valid.freePercent}
          onChange={(v) => handleChangeInput("freePercent", v)}
        />
      </div>
    </fieldset>
  );
}
