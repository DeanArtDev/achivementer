import React from "react";
import { FinancialPeriod, FinancialPeriodValue } from "providers/api/FinancialRequestProvider/types";
import { ValidatingCallbacks } from "../../types";
import { PARTS_LIMIT } from "../../consts";
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

  const [valid, periodOptions, partOptions] = useController(period, getValidationCallbacks);

  const handlePeriodChange = (name: keyof FinancialPeriod, value: FinancialPeriodValue): void => {
    if (value <= PARTS_LIMIT || name === "month") {
      onChangePeriod(name, value);
    }
  };

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
          <span className={"fieldset-period__text mb-2"}>Parts</span>

          <BaseSelect
            className={"fieldset-period__part"}
            options={partOptions}
            placeholder={`1 - ${PARTS_LIMIT}`}
            valid={valid.part}
            onChange={(v) => handlePeriodChange("part", Number(v))}
          />
        </label>
      </div>
    </fieldset>
  );
}
