import React, { useRef, useState } from "react";
import { FinancialReport, InputFinancialReport } from "providers/api/FinancialReportProvider/types";
import providers from "providers";
import { useEffectOnce } from "react-use";
import { useHistory } from "react-router-dom";
import { guardOneOf } from "utils/typeGuards";
import { financialRoute } from "router/FinancialRouter/consts";
import useRouterHistory from "hooks/useRouterHistory";
import useLoading from "hooks/useLoading";
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
  const { loading, setLoading } = useLoading();

  const replaceReport = (editedReport: FinancialReport): void => {
    setReports((state) => {
      if (state.length === 1) return [editedReport];
      return state.map((r) => (r.id === editedReport.id ? editedReport : r));
    });
  };

  const resetEditMode = () => {
    editedReport.current = undefined;
    setIsEditMode(false);
  };

  //todo: один репорт для оддного месяца, частей может быть до 3, но, репорт только один
  const handleReportEdit = async (report: FinancialReport | Omit<FinancialReport, "id">): Promise<void> => {
    setLoading(true);
    try {
      if (guardOneOf<FinancialReport>(report, "id")) {
        const updatedReport = await providers.FinancialReportProvider.update(report);
        replaceReport(updatedReport);
      } else {
        //todo: [error exception] сделать вменяемую обработку ошибок
        const reportWithoutPartsIds = { ...report, parts: removeIdsFromParts(report.parts) };
        const newReport = await providers.FinancialReportProvider.create(reportWithoutPartsIds);
        setReports([...reports, newReport]);
      }
    } finally {
      setLoading(false);
    }
    resetEditMode();
  };

  const handleDeleteReport = async (id: string) => {
    setLoading(true);
    try {
      const isDelete = await providers.FinancialReportProvider.delete(id);
      //todo: [error exception] если false то показывать плашку, мы не можем удалить этот репорт
      if (!isDelete) return;
      setReports(reports.filter((i) => i.id !== id));
    } finally {
      setLoading(false);
    }
  };

  const editedReport = useRef<FinancialReport>();
  const handleEditReport = (id: FinancialReport["id"]): void => {
    const report = reports.find((r) => r.id === id);
    if (!report) return;
    editedReport.current = report;
    setIsEditMode(true);
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
        <FinancialControl isEditMode={isEditMode} onAddClick={() => setIsEditMode(true)} onBackClick={resetEditMode} />
      </BaseHeader>

      <BaseMain className={"page-finances__main container-narrow"}>
        {isEditMode && <FinancesReportEditor editedReport={editedReport.current} onEditReport={handleReportEdit} />}

        {!isEditMode &&
          reports.map((r) => (
            <FinancialReportPreviewInfo
              className={"mb-4"}
              key={r.id}
              report={r}
              loading={loading}
              onEdit={handleEditReport}
              onDelete={handleDeleteReport}
              onCorrect={handleCorrectReport}
            />
          ))}
      </BaseMain>
    </BasePage>
  );
}
