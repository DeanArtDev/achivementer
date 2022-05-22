import React from "react";
import { PercentEntity } from "../../types";
import { calculatePercentage } from "utils/calculatePercentage";
import { PartName } from "./config";
import "./style.scss";

type Props = {
  percentEntity: PercentEntity;
  className?: string;
};

const computeSumFormPartIncome = (income: number, percent: number): number => {
  return Number(calculatePercentage(income, Number(percent)).toFixed(2));
};

export default function PercentCorrector({ className, percentEntity: { name, partIncome, percentFormIncome } }: Props) {
  const cls = ["percent-corrector"];
  if (className) cls.push(className);

  return (
    <div className={cls.join(" ")}>
      <span className={"percent-corrector__title"}>
        {`${PartName[name]}: ${percentFormIncome}% `}
        <span className={"percent-corrector__total"}>{computeSumFormPartIncome(partIncome, percentFormIncome)}</span>
      </span>
    </div>
  );
}
