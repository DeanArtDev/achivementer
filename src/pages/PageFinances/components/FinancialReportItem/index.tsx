import React from "react";
import { FinancialReport } from "providers/api/FinancialRequestProvider/types";
import useViewController from "./useViewController";
import FinancialReportPart from "./components/FinancialReportPart";
import FinancialReportManageMenu from "./components/FinancialReportManageMenu";

import "./style.scss";

type Props = {
  className?: string;
  report: FinancialReport;
  onDelete: (id: string) => void;
};

export default function FinancialReportItem({ className, onDelete, report }: Props) {
  const cls = ["finance-report"];
  if (className) cls.push(className);

  const [title, periods] = useViewController(report);

  return (
    <div className={cls.join(" ")}>
      <header className={"finance-report__header"}>
        <h3 className={"finance-report__title py-4"}>{title}</h3>

        <FinancialReportManageMenu className={"finance-report__menu pa-2"} onDelete={() => onDelete(report.id)} />
      </header>

      <div className={"finance-report__total-income my-2"}>{`The total month income: ${report.income}`}</div>

      <table className={"finance-report__table"}>
        <tbody className={"finance-report__table-body"}>
          <tr className={"finance-report__table-row __columned"}>
            <th className={"finance-report__table-head fw-bold"}>{`${report.percents.common}%`}</th>
            <th className={"finance-report__table-head __separator fw-bold"}>{`${report.percents.piggyBank}%`}</th>
            <th className={"finance-report__table-head fw-bold"}>{`${report.percents.free}%`}</th>
          </tr>

          {periods.map((period, index) => (
            <FinancialReportPart period={period} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
