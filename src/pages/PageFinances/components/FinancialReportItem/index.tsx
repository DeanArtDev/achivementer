import React, { Fragment, useState } from "react";
import { FinancialPercents, FinancialReport } from "../../types";
import { Month, Period } from "consts";

import "./style.scss";

type Props = {
  className?: string;
  report: FinancialReport;
};

type ReportPart = {
  title: string;
  commonAmount: number;
  piggyBakAmount: number;
  freeAmount: number;
};

type Percentage = Omit<ReportPart, "title">;

const getReportPartAmounts = (percentageOfIncome: Percentage, parts: FinancialReport["period"]["part"]): Percentage => {
  return {
    commonAmount: Number((percentageOfIncome.commonAmount / parts).toFixed(3)),
    piggyBakAmount: Number((percentageOfIncome.piggyBakAmount / parts).toFixed(3)),
    freeAmount: Number((percentageOfIncome.freeAmount / parts).toFixed(3)),
  };
};

const getPercentageOfIncome = (income: number, percents: FinancialPercents): Percentage => {
  return {
    commonAmount: Number(((income / 10) * (percents.commonPercent / 10)).toFixed(3)),
    piggyBakAmount: Number(((income / 10) * (percents.piggyBankPercent / 10)).toFixed(3)),
    freeAmount: Number(((income / 10) * (percents.freePercent / 10)).toFixed(3)),
  };
};

export default function FinancialReportItem({ className, report }: Props) {
  const cls = ["finance-report"];
  if (className) cls.push(className);

  const [percentageOfIncome] = useState<Percentage>({
    ...getPercentageOfIncome(report.income, report.percents),
  });

  const title = `The ${Month[Number(report.period.month.slice(report.period.month.length - 2))]} report`;
  const periods: ReportPart[] = new Array(report.period.part).fill("").map((_, index) => {
    return {
      title: `The ${Period[index]} period`,
      ...getReportPartAmounts(percentageOfIncome, report.period.part),
    };
  });

  return (
    <div className={cls.join(" ")}>
      <h3 className={"finance-report__title py-4"}>{title}</h3>

      <div className={"finance-report__total-income my-2"}>{`The month income: ${report.income}`}</div>

      <table className={"finance-report__table"}>
        <tbody className={"finance-report__table-body"}>
          <tr className={"finance-report__table-row __columned"}>
            <th className={"finance-report__table-head fw-bold"}>{`${report.percents.commonPercent}%`}</th>
            <th
              className={"finance-report__table-head __separator fw-bold"}
            >{`${report.percents.piggyBankPercent}%`}</th>
            <th className={"finance-report__table-head fw-bold"}>{`${report.percents.freePercent}%`}</th>
          </tr>

          {periods.map((period, index) => (
            <Fragment key={index}>
              <tr className={"finance-report__table-row"}>
                <td className={"finance-report__table-data"}>{period.title}</td>
              </tr>

              <tr className={"finance-report__table-row __columned"}>
                <td className={"finance-report__table-data"}>{period.commonAmount}</td>
                <td className={"finance-report__table-data __separator"}>{period.piggyBakAmount}</td>
                <td className={"finance-report__table-data"}>{period.freeAmount}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
