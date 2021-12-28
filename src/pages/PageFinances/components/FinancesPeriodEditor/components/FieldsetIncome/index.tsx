import React from "react";
import BaseInput from "components/BaseInput";

import "./style.scss";

type Props = {
  className?: string;
};

export default function FieldsetIncome({ className }: Props) {
  const cls = ["fieldset-income"];
  if (className) cls.push(className);

  return (
    <fieldset className={cls.join(" ")}>
      <legend className={"mb-2"}>Period income:</legend>
      <div className={"fieldset-income__wrapper"}>
        <BaseInput className={"fieldset-income pa-3 mb-2"} type="number" name="income" placeholder={"20000"} />
      </div>
    </fieldset>
  );
}
