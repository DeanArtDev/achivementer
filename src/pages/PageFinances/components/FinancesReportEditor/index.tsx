import React, { MouseEvent } from "react";
import {
  FinancialPart,
  FinancialPeriod,
  FinancialPeriodValue,
  FinancialReportFormData,
} from "providers/api/FinancialReportProvider/types";
import { Predicate, PredicateMap } from "type";
import findByIndexInArray from "utils/findByIndex";
import useController from "./useController";
import BaseButton from "UI/BaseButton";
import FieldsetPeriod from "./components/FieldsetPeriod";
import FinancePartList from "./components/FinancePartList";

import "./style.scss";

type Props = {
  className?: string;
  onEditReport: (reportFormData: FinancialReportFormData) => void;
};

const setPart = (part: FinancialPart, state: FinancialReportFormData): FinancialPart[] => {
  const result = findByIndexInArray(part.id, state.parts, (index, arr) => {
    return [...arr.slice(0, index), part, ...arr.slice(index + 1)];
  });

  if (!result) {
    return [part];
  }

  return result;
};

export default function FinancesReportEditor({ className, onEditReport }: Props) {
  const cls = ["finance-report-editor"];
  if (className) cls.push(className);

  const [formData, setFormData, shapeParts, validationPartsCallbacks, validationPeriodCallbacks, isFieldsValid] =
    useController();

  const handleChangePart = (part: FinancialPart): void => {
    setFormData((state) => ({ ...state, parts: setPart(part, state) }));
  };

  const handleChangePeriod = async (name: keyof FinancialPeriod, value: FinancialPeriodValue) => {
    if (name === "partCount") {
      setFormData((state) => ({
        ...state,
        period: { ...state.period, [name]: value },
        parts: shapeParts(value, state.parts),
      }));
      return;
    }
    setFormData((state) => ({ ...state, period: { ...state.period, [name]: value } }));
  };

  const handlePeriodValidationCallback = (predicate: Predicate) => {
    validationPeriodCallbacks.current = { ...validationPeriodCallbacks.current, [predicate.name]: predicate };
  };

  const handlePartsValidationCallbacks = (predicatesMap: PredicateMap) => {
    validationPartsCallbacks.current = predicatesMap;
  };

  const handleSubmitForm = (evt: MouseEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (isFieldsValid()) {
      onEditReport(formData);
    }
  };

  return (
    <form className={cls.join(" ")} onSubmit={handleSubmitForm}>
      <FieldsetPeriod
        period={formData.period}
        onChangePeriod={handleChangePeriod}
        setValidationCallback={handlePeriodValidationCallback}
      />

      <FinancePartList
        className={"mb-5"}
        parts={formData.parts}
        onChangePart={handleChangePart}
        setValidationCallbacks={handlePartsValidationCallbacks}
      />

      <BaseButton className={"mt-auto"} type={"submit"} disabled={formData.parts.length === 0} secondary fullWith>
        Save
      </BaseButton>
    </form>
  );
}
