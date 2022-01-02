import React, { useState } from "react";
import { FinancialReport } from "./types";
import BasePage from "UI/BasePage";
import FinancialControl from "./components/FinancialControl";
import FinancesReportEditor from "./components/FinancesReportEditor";
import FinancialReportItem from "./components/FinancialReportItem";

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
      <FinancialControl
        isEditMode={isEditMode}
        onAddClick={() => setIsEditMode(true)}
        onBackClick={() => setIsEditMode(false)}
      />

      <div className={"page-finances__content pa-4"}>
        {isEditMode && <FinancesReportEditor onEditReport={handleReportEdit} />}

        {!isEditMode &&
          reports.map((r, index) => {
            return <FinancialReportItem className={"mb-4"} report={r} key={index} />;
          })}
      </div>
    </BasePage>
  );
}
