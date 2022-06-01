import React from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { Period } from "consts";
import FinancialPartItem from "../FinancialPartItem";

import "./style.scss";

type Props = {
  className?: string;
  parts: FinancialPart[];
};
export default function FinancialPartList({ parts, className }: Props) {
  const cls = ["part-list__table pa-2"];
  if (className) cls.push(className);

  return (
    <table className={cls.join(" ")}>
      <tbody className={"part-list__table-body pa-2"}>
        {parts.map((part, index) => (
          <FinancialPartItem part={part} title={`${Period[index]} part: `} key={part.id} />
        ))}
      </tbody>
    </table>
  );
}
