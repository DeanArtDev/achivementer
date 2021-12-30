import React from "react";
import { numericToStringAdapter } from "utils/adapters";
import { isNumericOrVoid } from "utils/predicats";
import BaseInput from "components/BaseInput";

import "./style.scss";

type Props = {
  className?: string;
  income: number;
  required?: boolean;
  onChangeIncome?: (income: number) => void;
};

export default function FieldsetIncome({ className, income, required, onChangeIncome }: Props) {
  const cls = ["fieldset-income"];
  if (className) cls.push(className);

  const handleChangeInput = (income: string): void => {
    if (isNumericOrVoid(income)) {
      onChangeIncome && onChangeIncome(Number(income));
    }
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
          required={required}
          onChange={handleChangeInput}
        />
      </div>
    </fieldset>
  );
}
