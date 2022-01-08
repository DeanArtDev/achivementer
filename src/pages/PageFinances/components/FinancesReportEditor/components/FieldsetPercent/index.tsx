import React from "react";
import { FinancialPercents, FinancialPercentsValue } from "providers/api/FinancialRequestProvider/types";
import { ValidatingCallbacks } from "../../types";
import { isNumericOrVoid } from "utils/predicats";
import { numericToStringAdapter } from "utils/adapters";
import useController from "./useController";
import BaseInput from "UI/BaseInput";

import "./style.scss";

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
          value={numericToStringAdapter(percents.common)}
          valid={valid.common}
          onChange={(v) => handleChangeInput("common", v)}
        />

        <BaseInput
          className={"fieldset-percent__input pa-3"}
          name="piggy-bank-percent"
          placeholder={"20"}
          value={numericToStringAdapter(percents.piggyBank)}
          valid={valid.piggyBank}
          onChange={(v) => handleChangeInput("piggyBank", v)}
        />
        <BaseInput
          className={"fieldset-percent__input pa-3"}
          name="free-percent"
          placeholder={"30"}
          value={numericToStringAdapter(percents.free)}
          valid={valid.free}
          onChange={(v) => handleChangeInput("free", v)}
        />
      </div>
    </fieldset>
  );
}
