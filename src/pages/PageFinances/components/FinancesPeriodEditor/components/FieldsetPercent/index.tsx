import React from "react";
import {FinancialPercents, FinancialPercentsValue} from "../../../../types";
import { isNumericOrVoid } from "utils/predicats";
import { numericToStringAdapter } from "utils/adapters";
import BaseInput from "components/BaseInput";

import "./style.scss";

type Props = {
  className?: string;
  percents: FinancialPercents;
  onChangePercents?: (name: keyof FinancialPercents, value: FinancialPercentsValue) => void;
};

const PERCENT_LIMIT = 100;

export default function FieldsetPercent({ percents, className, onChangePercents }: Props) {
  const cls = ["fieldset-percent"];
  if (className) cls.push(className);

  const handleChangeInput = (name: keyof FinancialPercents, value: string): void => {
    if (isNumericOrVoid(value) && Number(value) <= PERCENT_LIMIT) {
      onChangePercents && onChangePercents(name, Number(value));
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
          required
          onChange={(v) => handleChangeInput("commonPercent", v)}
        />

        <BaseInput
          className={"fieldset-percent__input pa-3"}
          name="piggy-bank-percent"
          placeholder={"20"}
          value={numericToStringAdapter(percents.piggyBankPercent)}
          required
          onChange={(v) => handleChangeInput("piggyBankPercent", v)}
        />
        <BaseInput
          className={"fieldset-percent__input pa-3"}
          name="free-percent"
          placeholder={"30"}
          value={numericToStringAdapter(percents.freePercent)}
          required
          onChange={(v) => handleChangeInput("freePercent", v)}
        />
      </div>
    </fieldset>
  );
}
