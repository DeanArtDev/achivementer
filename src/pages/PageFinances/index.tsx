import React, { useRef, useState } from "react";
import { FinancialReport, InputFinancialReport } from "providers/api/FinancialReportProvider/types";
import providers from "providers";
import { useEffectOnce } from "react-use";
import { useHistory } from "react-router-dom";
import findByIndexInArray from "utils/findByIndex";
import { guardOneOf } from "utils/typeGuards";
import { financialRoute } from "router/FinancialRouter/consts";
import useRouterHistory from "hooks/useRouterHistory";
import BaseMain from "UI/BaseMain";
import BaseHeader from "UI/BaseHeader";
import BasePage from "UI/BasePage";
import FinancialControl from "./components/FinancialControl";
import FinancesReportEditor from "./components/FinancialReportEditor";
import FinancialReportPreviewInfo from "./components/FinancialReportPreviewInfo";
import "./style.scss";

const removeIdsFromParts = (parts: InputFinancialReport["parts"]) => {
  return parts.map((item) => {
    const newItem = { ...item };
    delete newItem.id;
    return newItem;
  });
};

export default function PageFinances() {
  const [reports, setReports] = useState<FinancialReport[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const replaceReport = (editedReport: FinancialReport): void => {
    setReports((state) => {
      if (state.length === 1) {
        return [editedReport];
      }

      const result = findByIndexInArray(editedReport.id, state, (index, arr) => {
        return [...arr.slice(0, index), editedReport, ...arr.slice(index + 1)];
      });

      return result || [...state];
    });
  };

  const reset = () => {
    editedReport.current = undefined;
    setIsEditMode(false);
  };

  //todo: сделать сплитинг parts of month, а не создавать новый в базе
  const handleReportEdit = async (report: FinancialReport | Omit<FinancialReport, "id">): Promise<void> => {
    if (guardOneOf<FinancialReport>(report, "id")) {
      const updatedReport = await providers.FinancialReportProvider.update(report);
      replaceReport(updatedReport);
    } else {
      //todo: сделать вменяемую обработку ошибок
      const reportWithoutPartsIds = { ...report, parts: removeIdsFromParts(report.parts) };
      const newReport = await providers.FinancialReportProvider.create(reportWithoutPartsIds);
      setReports([...reports, newReport]);
    }

    reset();
  };

  const handleDeleteReport = async (id: string) => {
    const isDelete = await providers.FinancialReportProvider.delete(id);
    if (isDelete) {
      setReports(reports.filter((i) => i.id !== id));
    }
  };

  const editedReport = useRef<FinancialReport>();
  const handleEditReport = (id: FinancialReport["id"]): void => {
    const report = reports.find((r) => r.id === id);
    if (report) {
      editedReport.current = report;
      setIsEditMode(true);
    }
  };

  const history = useHistory();
  const { getLocation } = useRouterHistory();
  const handleCorrectReport = (id: string): void => {
    history.push(getLocation(`${financialRoute.FINANCIAL_CORRECTOR}/${id}`));
  };

  useEffectOnce(() => {
    //todo: add the pagination
    //todo: add loader
    providers.FinancialReportProvider.getAll().then(setReports);
  });

  return (
    <BasePage className={"page-finances"}>
      <BaseHeader className={"page-finances__header container-narrow mb-4"}>
        <FinancialControl isEditMode={isEditMode} onAddClick={() => setIsEditMode(true)} onBackClick={reset} />
      </BaseHeader>

      <BaseMain className={"page-finances__main container-narrow"}>
        {isEditMode && <FinancesReportEditor editedReport={editedReport.current} onEditReport={handleReportEdit} />}

        {!isEditMode &&
          reports.map((r) => (
            <FinancialReportPreviewInfo
              className={"mb-4"}
              report={r}
              key={r.id}
              onEdit={handleEditReport}
              onDelete={handleDeleteReport}
              onCorrect={handleCorrectReport}
            />
          ))}
      </BaseMain>
    </BasePage>
  );
}
