import React, { useState } from "react";
import { FinancialReport, InputFinancialReport } from "providers/api/FinancialReportProvider/types";
import providers from "providers";
import BasePage from "UI/BasePage";
import { useEffectOnce } from "react-use";
import FinancialControl from "./components/FinancialControl";
import FinancesReportEditor from "./components/FinancesReportEditor";
import FinancialReportDetails from "./components/FinancialReportDetails";

import "./style.scss";

export default function PageFinances() {
  const [reports, setReports] = useState<FinancialReport[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  //todo: сделать сплитинг parts of month, а не создавать новый в базе
  const handleReportEdit = async (reportFormData: InputFinancialReport): Promise<void> => {
    try {
      const newReport = await providers.FinancialReportProvider.create(reportFormData);
      setReports([...reports, newReport]);
      setIsEditMode(false);
    } catch (e) {
      //todo: сделать вменяемую обработку ошибок
      console.error(e);
    }
  };

  //todo: add a confirmation of deleting
  const handleDeleteReport = async (id: string) => {
    const isDelete = await providers.FinancialReportProvider.delete(id);
    if (isDelete) {
      setReports(reports.filter((i) => i.id !== id));
    }
  };

  useEffectOnce(() => {
    //todo: add the pagination
    providers.FinancialReportProvider.getAll().then(setReports);
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
          reports.map((r) => (
            <FinancialReportDetails className={"mb-4"} report={r} key={r.id} onDelete={handleDeleteReport} />
          ))}
      </div>
    </BasePage>
  );
}
