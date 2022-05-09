import React, { useRef } from "react";
import { useEffectOnce } from "react-use";
import { FinancialPeriodValue } from "providers/api/FinancialReportProvider/types";
import { ValidationPeriodMap } from "../../../../types";
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
  getValidate?: (validatingPartListMap: ValidationPeriodMap) => void;
};

export default function FieldsetPeriod({ className, month, partCount, onChangePeriod, getValidate }: Props) {
  const cls = ["fieldset-period"];
  if (className) cls.push(className);

  const [periodOptions, partOptions] = useController();

  const validationFieldsMap = useRef<ValidationPeriodMap>({ month: undefined, partCount: undefined });
  const handleValidGet = (name: InputFinancialPeriod, validate: (value?: string) => boolean): void => {
    validationFieldsMap.current[name] = validate;
  };

  const handlePeriodChange = (name: InputFinancialPeriod, value: FinancialPeriodValue): void => {
    if (value <= PARTS_LIMIT || name === "month") {
      onChangePeriod(name, value);
    }
  };

  useEffectOnce(() => {
    getValidate && getValidate(validationFieldsMap.current);
  });

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
            getValidate={(cb) => handleValidGet("month", cb)}
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
            getValidate={(cb) => handleValidGet("partCount", cb)}
            onChange={(v) => handlePeriodChange("partCount", Number(v))}
          />
        </label>
      </div>
    </fieldset>
  );
}
