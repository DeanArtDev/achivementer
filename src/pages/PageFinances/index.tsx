import React, { useState } from "react";
import { FinancialReport } from "./types";
import BasePage from "components/BasePage";
import BaseButton from "components/BaseButton";
import FinancialReportItem from "./components/FinancialReportItem";
import FinancesReportEditor from "./components/FinancesPeriodEditor";

import "./style.scss";

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

      <div className={"page-finances__content pa-4"}>
        {isEditMode && <FinancesReportEditor onEditReport={handleReportEdit} />}

        {!isEditMode && reports.map((r, index) => (
          <FinancialReportItem className={"mb-4"} report={r} key={index} />
        ))}
      </div>
    </BasePage>
  );
}
