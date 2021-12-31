import React, { FormEvent, useState } from "react";
import {
  FinancialReport,
  FinancialPercents,
  FinancialPeriod,
  FinancialPercentsValue,
  FinancialPeriodValue,
} from "../../types";
import BaseButton from "components/UI/BaseButton";
import FieldsetPeriod from "./components/FieldsetPeriod";
import FieldsetIncome from "./components/FieldsetIncome";
import FieldsetPercent from "./components/FieldsetPercent";

import "./style.scss";

type Props = {
  className?: string;
  onEditReport?: (report: FinancialReport) => void;
};

const getInitialPeriodMonthValue = (): string => {
  const data = new Date();
  return `${data.getFullYear()}-${data.getMonth() + 1}`;
};

export default function FinancesReportEditor({ className, onEditReport }: Props) {
  const cls = ["finance-report-editor"];
  if (className) cls.push(className);

  const [formData, setFormData] = useState<FinancialReport>({
    period: {
      month: getInitialPeriodMonthValue(),
      part: 0,
    },
    income: 0,
    percents: {
      commonPercent: 0,
      piggyBankPercent: 0,
      freePercent: 0,
    },
  });

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
    onEditReport && onEditReport(formData);
  };

  return (
    <form className={cls.join(" ")} onSubmit={handleSubmitForm}>
      <FieldsetPeriod period={formData.period} onChangePeriod={handleChangePeriod} />

      <FieldsetIncome income={formData.income} onChangeIncome={handleChangeIncome} />

      <FieldsetPercent percents={formData.percents} onChangePercents={handleChangePercents} />

      <BaseButton className={"mt-auto"} type={"submit"} secondary fullWith>
        Save
      </BaseButton>
    </form>
  );
}
