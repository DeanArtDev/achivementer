import React, { MouseEvent, useState } from "react";
import {
  FinancialPercents,
  FinancialPeriod,
  FinancialPercentsValue,
  FinancialPeriodValue,
  InputFinancialReport,
  FinancialReport,
} from "providers/api/FinancialRequestProvider/types";
import { Predicate } from "type";
import useController from "./useController";
import BaseButton from "UI/BaseButton";
import FieldsetPeriod from "./components/FieldsetPeriod";
import FinancePartFieldset from "./components/FinancePartFieldset";

import "./style.scss";

type Props = {
  className?: string;
  editedReport?: FinancialReport;
  onEditReport: (reportFormData: InputFinancialReport) => void;
};

export default function FinancesReportEditor({ className, editedReport, onEditReport }: Props) {
  const cls = ["finance-report-editor"];
  if (className) cls.push(className);

  const [formData, setFormData] = useController(editedReport);

  const handleChangePercent = (name: keyof FinancialPercents, value: FinancialPercentsValue): void => {
    setFormData((state) => ({ ...state, percents: { ...state.percents, [name]: value } }));
  };

  const handleChangeIncome = (income: number): void => {
    setFormData((state) => ({ ...state, income: Number(income) }));
  };

  const handleChangePeriod = (name: keyof FinancialPeriod, value: FinancialPeriodValue) => {
    setFormData((state) => ({ ...state, period: { ...state.period, [name]: value } }));
  };

  const [validationCallbacks, setValidationCallbacks] = useState({});
  const handleValidationCallback = (predicate: Predicate) => {
    setValidationCallbacks((state) => ({ ...state, [predicate.name]: predicate }));
  };

  const handleSubmitForm = (evt: MouseEvent): void => {
    evt.preventDefault();
    if (isFieldsValid()) {
      onEditReport(formData);
    }
  };

  const isFieldsValid = (): boolean => {
    return Object.values<Predicate>(validationCallbacks)
      .map((cb) => cb())
      .every((r) => r);
  };

  return (
    <form className={cls.join(" ")}>
      <FieldsetPeriod period={formData.period} onChangePeriod={handleChangePeriod} />

      <FinancePartFieldset
        income={formData.income}
        percents={formData.percents}
        onChangePercent={handleChangePercent}
        onChaneIncome={handleChangeIncome}
        setValidationCallback={handleValidationCallback}
      />

      <BaseButton className={"mt-auto"} type={"submit"} secondary fullWith onClick={handleSubmitForm}>
        Save
      </BaseButton>
    </form>
  );
}
