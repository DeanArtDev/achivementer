import React from "react";
import BaseInput from "components/BaseInput";

import "./style.scss";

type Props = {
  className?: string;
  income?: string;
  onChangeIncome?: (income: string) => void;
};

export default function FieldsetIncome({ className, income, onChangeIncome }: Props) {
  const cls = ["fieldset-income"];
  if (className) cls.push(className);

  return (
    <fieldset className={cls.join(" ")}>
      <legend className={"mb-2"}>Period income:</legend>

      <div className={"fieldset-income__wrapper"}>
        <BaseInput
          className={"fieldset-income pa-3 mb-2"}
          value={income}
          name={"income"}
          placeholder={"20000"}
          required
          onChange={onChangeIncome}
        />
      </div>
    </fieldset>
  );
}
