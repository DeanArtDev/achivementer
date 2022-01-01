import React, { FormEvent } from "react";
import {
  FinancialReport,
  FinancialPercents,
  FinancialPeriod,
  FinancialPercentsValue,
  FinancialPeriodValue,
} from "../../types";
import useController from "./useController";
import BaseButton from "UI/BaseButton";
import FieldsetPeriod from "./components/FieldsetPeriod";
import FieldsetIncome from "./components/FieldsetIncome";
import FieldsetPercent from "./components/FieldsetPercent";

import "./style.scss";

type Props = {
  className?: string;
  onEditReport: (report: FinancialReport) => void;
};

export default function FinancesReportEditor({ className, onEditReport }: Props) {
  const cls = ["finance-report-editor"];
  if (className) cls.push(className);

  const [formData, setFormData, isFieldsValid, callbacksArrayToMap, setValidationCallbacksBuffer] = useController();

  const handleChangePercents = (name: keyof FinancialPercents, value: FinancialPercentsValue): void => {
    setFormData({ ...formData, percents: { ...formData.percents, [name]: value } });
  };

  const handleChangeIncome = (income: number): void => {
    setFormData({ ...formData, income: Number(income) });
  };

  const handleChangePeriod = (name: keyof FinancialPeriod, value: FinancialPeriodValue) => {
    setFormData({ ...formData, period: { ...formData.period, [name]: value } });
  };

  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    //todo: доработать через Context что бы не было постоянных пересобираний callbacks а делалось это дин раз в момент нажатия submit
    if (isFieldsValid()) onEditReport(formData);
  };

  const handleValidateFieldset = (callbackList: (() => boolean)[]): void => {
    const adaptedCallbacks = callbacksArrayToMap(callbackList);
    setValidationCallbacksBuffer((state) => ({ ...state, ...adaptedCallbacks }));
  };

  return (
    <form className={cls.join(" ")} onSubmit={handleSubmitForm}>
      <FieldsetPeriod
        period={formData.period}
        getValidationCallbacks={handleValidateFieldset}
        onChangePeriod={handleChangePeriod}
      />

      <FieldsetIncome
        income={formData.income}
        getValidationCallbacks={handleValidateFieldset}
        onChangeIncome={handleChangeIncome}
      />

      <FieldsetPercent
        percents={formData.percents}
        getValidationCallbacks={handleValidateFieldset}
        onChangePercents={handleChangePercents}
      />

      {/*todo: fix disabled styles for second button*/}
      <BaseButton className={"mt-auto"} type={"submit"} secondary fullWith>
        Save
      </BaseButton>
    </form>
  );
}
