import React, { useState } from "react";
import { FinancialReport, InputFinancialReport } from "providers/api/FinancialRequestProvider/types";
import providers from "providers";
import BasePage from "UI/BasePage";
import { useEffectOnce } from "react-use";
import FinancialControl from "./components/FinancialControl";
import FinancesReportEditor from "./components/FinancesReportEditor";
import FinancialReportItem from "./components/FinancialReportItem";

import "./style.scss";

export default function PageFinances() {
  const [reports, setReports] = useState<FinancialReport[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleReportEdit = async (reportFormData: InputFinancialReport): Promise<void> => {
    try {
      const newReport = await providers.FinancialRequestProvider.createReport(reportFormData);
      setReports([...reports, newReport]);
    } finally {
      setIsEditMode(false);
    }
  };

  useEffectOnce(() => {
    providers.FinancialRequestProvider.getAllReports().then((res) => setReports(res));
  });

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
          reports.map((r) => {
            return <FinancialReportItem className={"mb-4"} report={r} key={r.id} />;
          })}
      </div>
    </BasePage>
  );
}
