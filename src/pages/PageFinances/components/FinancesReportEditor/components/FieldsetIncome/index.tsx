import React from "react";
import { ValidatingCallbacks } from "../../types";
import { numericToStringAdapter } from "utils/adapters";
import { isNumericOrVoid } from "utils/predicats";
import BaseInput from "components/UI/BaseInput";
import useController from "./useController";

import "./style.scss";

type Props = {
  className?: string;
  income: number;
  onChangeIncome: (income: number) => void;
  getValidationCallbacks?: ValidatingCallbacks;
};

export default function FieldsetIncome({ className, income, getValidationCallbacks, onChangeIncome }: Props) {
  const cls = ["fieldset-income"];
  if (className) cls.push(className);

  const valid = useController(income, getValidationCallbacks);

  const handleChangeInput = (income: string): void => {
    if (isNumericOrVoid(income)) onChangeIncome(Number(income));
  };

  return (
    <fieldset className={cls.join(" ")}>
      <legend className={"mb-2"}>Period income:</legend>

      <div className={"fieldset-income__wrapper"}>
        <BaseInput
          className={"fieldset-income pa-3 mb-2"}
          value={numericToStringAdapter(income)}
          name={"income"}
          placeholder={"20000"}
          valid={valid.income}
          onChange={handleChangeInput}
        />
      </div>
    </fieldset>
  );
}
