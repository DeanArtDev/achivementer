import React from "react";
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
      <FieldsetPeriod className={"mb-4"} />

      <FieldsetIncome className={"mb-4"} />

      <FieldsetPercent />
    </form>
  );
}
