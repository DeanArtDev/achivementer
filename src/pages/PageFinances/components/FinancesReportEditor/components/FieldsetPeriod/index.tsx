import React from "react";
import { FinancialPeriod, FinancialPeriodValue } from "../../../../types";
import { ValidatingCallbacks } from "../../types";
import { PARTS_LIMIT } from "../../consts";
import { numericToStringAdapter } from "utils/adapters";
import BaseInput from "components/UI/BaseInput";
import { isNumericOrVoid } from "utils/predicats";
import useController from "./useController";

import "./style.scss";

type Props = {
  className?: string;
  period: FinancialPeriod;
  onChangePeriod: (name: keyof FinancialPeriod, value: FinancialPeriodValue) => void;
  getValidationCallbacks?: ValidatingCallbacks;
};

export default function FieldsetPeriod({ className, period, getValidationCallbacks, onChangePeriod }: Props) {
  const cls = ["fieldset-period"];
  if (className) cls.push(className);

  const valid = useController(period, getValidationCallbacks);

  const handlePeriodChange = (name: keyof FinancialPeriod, value: string): void => {
    const typedValue = name === "month" ? value : Number(value);
    //todo: when it is replaced a select tag you should have a look at name === month
    if ((isNumericOrVoid(value) && Number(value) <= PARTS_LIMIT) || name === "month") {
      onChangePeriod(name, typedValue);
    }
  };

  return (
    <fieldset className={cls.join(" ")}>
      <legend className={"mb-2"}>Period:</legend>

      <div className={"fieldset-period__wrapper"}>
        <label className={"fieldset-period__label"} htmlFor={"period"}>
          <span className={"fieldset-period__text mb-2"}>Month</span>

          <BaseInput
            className={"fieldset-period__type pa-3"}
            id={"period"}
            name={"period"}
            type={"month"}
            value={period.month}
            valid={valid.month}
            onChange={(v) => handlePeriodChange("month", v)}
          />
        </label>

        <label className={"fieldset-period__label"} htmlFor={"part"}>
          <span className={"fieldset-period__text mb-2"}>Part</span>

          <BaseInput
            className={"fieldset-period__part pa-3"}
            id={"part"}
            name={"part"}
            placeholder={`1 - ${PARTS_LIMIT}`}
            value={numericToStringAdapter(period.part)}
            valid={valid.part}
            onChange={(v) => handlePeriodChange("part", v)}
          />
        </label>
      </div>
    </fieldset>
  );
}
