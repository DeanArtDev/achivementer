import React, { useRef } from "react";
import { FinancialPeriodValue } from "providers/api/FinancialReportProvider/types";
import { ValidationFieldsMap } from "../../../../types";
import { InputFinancialPeriod } from "../../types";
import { PARTS_LIMIT } from "../../consts";
import { numericToStringAdapter } from "utils/adapters";
import BaseSelect from "UI/BaseSelect";
import useController from "./controller";

import "./style.scss";

type Props = {
  className?: string;
  partCount: number;
  month: number;
  onChangePeriod: (name: InputFinancialPeriod, value: FinancialPeriodValue) => void;
  onValidCheck?: (isValid: boolean) => void;
};

export default function FieldsetPeriod({ className, month, partCount, onChangePeriod, onValidCheck }: Props) {
  const cls = ["fieldset-period"];
  if (className) cls.push(className);

  const [periodOptions, partOptions] = useController();

  const validationFieldsMap = useRef<ValidationFieldsMap>({});
  const handleValidCheck = (name: InputFinancialPeriod, isValid: boolean): void => {
    validationFieldsMap.current[name] = isValid;
    onValidCheck && onValidCheck(Object.values(validationFieldsMap.current).every(Boolean));
  };

  const handlePeriodChange = (name: InputFinancialPeriod, value: FinancialPeriodValue): void => {
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
            name={"month"}
            options={periodOptions}
            value={String(month)}
            required
            onValidCheck={(v) => handleValidCheck("month", v)}
            onChange={(v) => handlePeriodChange("month", Number(v))}
          />
        </label>

        <label className={"fieldset-period__label"} htmlFor={"part"}>
          <span className={"fieldset-period__text mb-2"}>Parts</span>

          <BaseSelect
            className={"fieldset-period__part"}
            name={"part-count"}
            options={partOptions}
            value={numericToStringAdapter(partCount)}
            placeholder={`1 - ${PARTS_LIMIT}`}
            required
            onValidCheck={(v) => handleValidCheck("partCount", v)}
            onChange={(v) => handlePeriodChange("partCount", Number(v))}
          />
        </label>
      </div>
    </fieldset>
  );
}
