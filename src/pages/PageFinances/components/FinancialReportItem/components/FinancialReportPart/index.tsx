import React, { Fragment } from "react";
import { ReportPart } from "../../types";

type Props = {
  period: ReportPart;
};

export default function FinancialReportPart({ period }: Props) {
  return (
    <Fragment>
      <tr className={"finance-report__table-row"}>
        <td className={"finance-report__table-data"}>{period.title}</td>
      </tr>

      <tr className={"finance-report__table-row __columned"}>
        <td className={"finance-report__table-data"}>{period.commonAmount}</td>
        <td className={"finance-report__table-data __separator"}>{period.piggyBakAmount}</td>
        <td className={"finance-report__table-data"}>{period.freeAmount}</td>
      </tr>
    </Fragment>
  );
}
