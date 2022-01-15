import React from "react";
import { FinancialPercents, FinancialPercentsValue } from "providers/api/FinancialRequestProvider/types";
import { InputValidationOptions, Predicate } from "type";
import { numericToStringAdapter } from "utils/adapters";
import { Regexp } from "consts";
import BaseInput from "UI/BaseInput";

import "./style.scss";

type Props = {
  className?: string;
  income: number;
  percents: FinancialPercents;
  onChaneIncome: (income: number) => void;
  setValidationCallback: (predicate: Predicate) => void;
  onChangePercent: (name: keyof FinancialPercents, value: FinancialPercentsValue) => void;
};

const percentsValidationOptions: InputValidationOptions = { regexp: Regexp.PERCENT, require: true };

export default function FinancePartFieldset({
  income,
  percents,
  className,
  onChaneIncome,
  onChangePercent,
  setValidationCallback,
}: Props) {
  const cls = ["fieldset-part"];
  if (className) cls.push(className);

  const handleChangePercent = (name: keyof FinancialPercents, value: string): void => {
    onChangePercent(name, Number(value));
  };

  return (
    <div className={cls.join(" ")}>
      <legend className={"mb-2"}>Period income:</legend>

      <div className={"fieldset-income__wrapper"}>
        <BaseInput
          className={"fieldset-income pa-3 mb-2"}
          name={"income"}
          placeholder={"20000"}
          value={numericToStringAdapter(income)}
          inputValidateOptions={{ regexp: Regexp.NUMERIC, require: true }}
          onChange={(v) => onChaneIncome(Number(v))}
          setValidationCallback={(cb) => setValidationCallback(cb)}
        />
      </div>

      <fieldset>
        <legend className={"mb-2"}>Percents &quot;%&quot;:</legend>

        <div className={"fieldset-part__wrapper"}>
          <BaseInput
            className={"fieldset-part__input pa-3"}
            name="common-percent"
            placeholder={"50"}
            inputValidateOptions={percentsValidationOptions}
            value={numericToStringAdapter(percents.common)}
            setValidationCallback={(cb) => setValidationCallback(cb)}
            onChange={(v) => handleChangePercent("common", v)}
          />

          <BaseInput
            className={"fieldset-part__input pa-3"}
            name="piggy-bank-percent"
            placeholder={"20"}
            inputValidateOptions={percentsValidationOptions}
            value={numericToStringAdapter(percents.piggyBank)}
            setValidationCallback={(cb) => setValidationCallback(cb)}
            onChange={(v) => handleChangePercent("piggyBank", v)}
          />

          <BaseInput
            className={"fieldset-part__input pa-3"}
            name="free-percent"
            placeholder={"30"}
            inputValidateOptions={percentsValidationOptions}
            value={numericToStringAdapter(percents.free)}
            setValidationCallback={(cb) => setValidationCallback(cb)}
            onChange={(v) => handleChangePercent("free", v)}
          />
        </div>
      </fieldset>
    </div>
  );
}
