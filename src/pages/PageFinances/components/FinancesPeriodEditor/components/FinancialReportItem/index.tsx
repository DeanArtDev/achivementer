import React from "react";
import { FinancialReport } from "../../types";
import { Month } from "consts";

import "./style.scss";

type Props = {
  className?: string;
  report: FinancialReport;
};

export default function FinancialReportItem({ className, report }: Props) {
  const cls = ["finance-report"];
  if (className) cls.push(className);

  const title = `The ${Month[Number(report.period.month)]} report`;

  return (
    <div className={cls.join(" ")}>
      <h3 className={"finance-report__title"}>{title}</h3>

      <table className={"finance-report__table"}>
        <tbody>
          <tr className={"finance-report__table-row"}>
            <th className={"finance-report__table-head"}>50%</th>
            <th className={"finance-report__table-head"}>30%</th>
            <th className={"finance-report__table-head"}>20%</th>
          </tr>

          <tr className={"finance-report__table-row"}>
            <td className={"finance-report__table-data"}>First period</td>
          </tr>

          <tr className={"finance-report__table-row"}>
            <td className={"finance-report__table-data"}>3424432</td>
            <td className={"finance-report__table-data"}>42343</td>
            <td className={"finance-report__table-data"}>2535</td>
          </tr>

          <tr className={"finance-report__table-row"}>
            <td className={"finance-report__table-data"}>Second period</td>
          </tr>

          <tr className={"finance-report__table-row"}>
            <td className={"finance-report__table-data"}>3424432</td>
            <td className={"finance-report__table-data"}>42343</td>
            <td className={"finance-report__table-data"}>2535</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
