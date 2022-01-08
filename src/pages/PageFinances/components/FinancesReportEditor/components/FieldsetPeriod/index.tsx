import React, { useMemo } from "react";
import { FinancialPeriod, FinancialPeriodValue } from "providers/api/FinancialRequestProvider/types";
import { BaseOption } from "type";
import { ValidatingCallbacks } from "../../types";
import { PARTS_LIMIT } from "../../consts";
import { numericToStringAdapter } from "utils/adapters";
import { Month } from "consts";
import BaseInput from "UI/BaseInput";
import BaseSelect from "UI/BaseSelect";
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

  const handlePeriodChange = (name: keyof FinancialPeriod, value: FinancialPeriodValue): void => {
    if (value <= PARTS_LIMIT || name === "month") {
      onChangePeriod(name, value);
    }
  };

  const periodOptions = useMemo(
    () => {
      return Object.values(Month).reduce<BaseOption<number>[]>((acc, i) => {
        if (typeof i === "number") acc.push({ value: i, text: Month[i] });
        return acc;
      }, [])
    },
    [Month]
  );

  return (
    <fieldset className={cls.join(" ")}>
      <legend className={"mb-2"}>Period:</legend>

      <div className={"fieldset-period__wrapper"}>
        <label className={"fieldset-period__label"} htmlFor={"period"}>
          <span className={"fieldset-period__text mb-2"}>Month</span>

          <BaseSelect
            options={periodOptions}
            valid={valid.month}
            onChange={(v) => handlePeriodChange("month", Number(v))}
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
            onChange={(v) => handlePeriodChange("part", Number(v))}
          />
        </label>
      </div>
    </fieldset>
  );
}
