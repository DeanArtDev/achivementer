import React from "react";
import BaseButton from "components/BaseButton";
import FieldsetPeriod from "./components/FieldsetPeriod";
import FieldsetIncome from "./components/FieldsetIncome";
import FieldsetPercent from "./components/FieldsetPercent";

import "./style.scss";

type Props = {
  className?: string;
};

export default function FinancesPeriodEditor({ className }: Props) {
  const cls = ["finance-period-editor"];
  if (className) cls.push(className);

  return (
    <form className={cls.join(" ")}>
      <FieldsetPeriod />

      <FieldsetIncome />

      <FieldsetPercent />

      <BaseButton className={"mt-auto"} secondary fullWith>
        Save
      </BaseButton>
    </form>
  );
}
