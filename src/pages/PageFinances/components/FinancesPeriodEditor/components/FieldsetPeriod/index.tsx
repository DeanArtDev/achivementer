import React from "react";
import { FinancialPeriod, FinancialPeriodValue } from "../../../../types";
import { PARTS_LIMIT } from "../../consts";
import { numericToStringAdapter } from "utils/adapters";
import { isNumericOrVoid } from "utils/predicats";
import BaseInput from "components/BaseInput";

import "./style.scss";

type Props = {
  className?: string;
  period: FinancialPeriod;
  onChangePeriod?: (name: keyof FinancialPeriod, value: FinancialPeriodValue) => void;
};

export default function FieldsetPeriod({ className, period, onChangePeriod }: Props) {
  const cls = ["fieldset-period"];
  if (className) cls.push(className);

  const handlePeriodChange = (name: keyof FinancialPeriod, value: string): void => {
    const typedValue = name === "month" ? value : Number(value);
    //todo: when it is replaced a select tag you should have a look at name === month
    if ((isNumericOrVoid(value) && Number(value) <= PARTS_LIMIT) || name === "month") {
      onChangePeriod && onChangePeriod(name, typedValue);
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
            required
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
            required
            value={numericToStringAdapter(period.part)}
            onChange={(v) => handlePeriodChange("part", v)}
          />
        </label>
      </div>
    </fieldset>
  );
}
