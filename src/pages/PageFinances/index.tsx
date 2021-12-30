import React, { useState } from "react";
import BasePage from "components/BasePage";
import BaseButton from "components/BaseButton";

import "./style.scss";
import FinancialReportItem from "./components/FinancesPeriodEditor/components/FinancialReportItem";
import FinancesReportEditor from "./components/FinancesPeriodEditor";
import { FinancialReport } from "./components/FinancesPeriodEditor/types";

export default function PageFinances() {
  const [reports, setReports] = useState<FinancialReport[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleReportEdit = (report: FinancialReport): void => {
    setReports([...reports, report]);
    setIsEditMode(false);
  };

  return (
    <BasePage className={"page-finances container-narrow"}>
      <ul className={"finance-control px-4 py-2 mb-4"}>
        <li className={"finance-control__item"}>
          <BaseButton className={"fw-light ml-auto"} onClick={() => setIsEditMode(true)}>
            Add month
          </BaseButton>
        </li>
      </ul>

      <div className="page-finances__content pa-4">
        {isEditMode && <FinancesReportEditor onEditReport={handleReportEdit} />}

        {reports.map((r) => (
          <FinancialReportItem report={r} key={new Date().toString()} />
        ))}
      </div>
    </BasePage>
  );
}
