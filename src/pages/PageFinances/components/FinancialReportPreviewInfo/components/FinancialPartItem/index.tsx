import React, { Fragment } from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { calculatePercentage } from "utils/calculatePercentage";
import "./style.scss";

type Props = {
  title: string;
  part: FinancialPart;
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
        <td className={"financial-part__table-data __red"}>{calculatePercentage(income, common).toFixed(2)}</td>
        <td className={"financial-part__table-data __green"}>{calculatePercentage(income, free).toFixed(2)}</td>
        <td className={"financial-part__table-data __yellow"}>{calculatePercentage(income, piggyBank).toFixed(2)}</td>
      </tr>
    </Fragment>
  );
}
