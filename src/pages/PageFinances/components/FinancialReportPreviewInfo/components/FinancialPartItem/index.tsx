import React, { Fragment } from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";

import "./style.scss";

type Props = {
  title: string;
  part: FinancialPart;
};

type FinancialPartPercentage = FinancialPart["common"] | FinancialPart["piggyBank"] | FinancialPart["free"];

const calculatePercentageOfIncome = (
  income: FinancialPart["income"],
  percentage: FinancialPartPercentage
): FinancialPartPercentage => {
  return Number(((income / 100) * percentage).toFixed(2));
};

export default function FinancialPartItem({ part, title }: Props) {
  const { income, common, piggyBank, free } = part;

  return (
    <Fragment>
      <tr className={"financial-part__table-row"}>
        <th className={"financial-part__table-head mb-3"}>
          <span>{title}</span>
          <span className={"financial-part__income"}>{income}</span>
        </th>
      </tr>

      <tr className={"financial-part__table-row __tripled-columned mb-4"}>
        <td className={"financial-part__table-data pb-4"}>{common}%</td>
        <td className={"financial-part__table-data pb-4"}>{free}%</td>
        <td className={"financial-part__table-data pb-4"}>{piggyBank}%</td>
        <td className={"financial-part__table-data __red"}>{calculatePercentageOfIncome(income, common)}</td>
        <td className={"financial-part__table-data __green"}>{calculatePercentageOfIncome(income, free)}</td>
        <td className={"financial-part__table-data __yellow"}>{calculatePercentageOfIncome(income, piggyBank)}</td>
      </tr>
    </Fragment>
  );
}
