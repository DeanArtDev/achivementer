import React, { FormEvent, useState } from "react";
import { ExtractKeysOfValueType } from "type";
import { FinancialReport, FinancialPercents, FinancialPercentsValue, FinancialPeriod } from "./types";
import { PARTS_LIMIT } from "./consts";
import { isNumericStringOrVoid } from "utils/predicats";
import BaseButton from "components/BaseButton";
import FieldsetPeriod from "./components/FieldsetPeriod";
import FieldsetIncome from "./components/FieldsetIncome";
import FieldsetPercent from "./components/FieldsetPercent";

import "./style.scss";

type Props = {
  className?: string;
  onEditReport?: (report: FinancialReport) => void;
};

const PERCENT_LIMIT = 100;

const getInitialPeriodMonthValue = (): string => {
  const data = new Date();
  return `${data.getFullYear()}-${data.getMonth() + 1}`;
};

export default function FinancesReportEditor({ className, onEditReport }: Props) {
  const cls = ["finance-period-editor"];
  if (className) cls.push(className);

  const [formData, setFormData] = useState<FinancialReport>({
    period: {
      month: getInitialPeriodMonthValue(),
      part: "",
    },
    income: "",
    percents: {
      commonPercent: "",
      piggyBankPercent: "",
      freePercent: "",
    },
  });

  const handleChangePercents = (name: keyof FinancialPercents, value: FinancialPercentsValue): void => {
    if (isNumericStringOrVoid(value) && Number(value) <= PERCENT_LIMIT) {
      setFormData({ ...formData, percents: { ...formData.percents, [name]: value } });
    }
  };

  const handleChangeIncome = (income: string): void => {
    if (isNumericStringOrVoid(income)) {
      setFormData({ ...formData, income });
    }
  };

  const handleChangePeriod = (name: keyof FinancialPeriod, value: ExtractKeysOfValueType<FinancialPeriod>) => {
    //todo: when it is replaced a select tag you should have a look at name === month
    if ((isNumericStringOrVoid(value) && Number(value) <= PARTS_LIMIT) || name === "month") {
      setFormData({ ...formData, period: { ...formData.period, [name]: value } });
    }
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
