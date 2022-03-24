import React, { MouseEvent } from "react";
import { FinancialPart, FinancialPeriodValue, FinancialReport } from "providers/api/FinancialReportProvider/types";
import { InputFinancialPeriod } from "./types";
import findByIndexInArray from "utils/findByIndex";
import useController from "./useController";
import useViewController from "./useViewController";
import BaseButton from "UI/BaseButton";
import FieldsetPeriod from "./components/FieldsetPeriod";
import FinancialFieldsetPartList from "./components/FinancialFieldsetPartList";

import "./style.scss";

type Props = {
  className?: string;
  editedReport?: FinancialReport;
  onEditReport: (reportFormData: Omit<FinancialReport, "id"> | FinancialReport) => void;
};

const setPart = (part: FinancialPart, state: Omit<FinancialReport, "id">): FinancialPart[] => {
  const result = findByIndexInArray(part.id, state.parts, (index, arr) => {
    return [...arr.slice(0, index), part, ...arr.slice(index + 1)];
  });

  if (!result) return [part];

  return result;
};

export default function FinancesReportEditor({ className, editedReport, onEditReport }: Props) {
  const cls = ["finance-report-editor"];
  if (className) cls.push(className);

  const [formData, setFormData, shapeParts] = useController(editedReport);
  const [setValidationPartsCallbacks, setValidationPeriodCallbacks, isFieldsValid] = useViewController();

  const handleChangePart = (part: FinancialPart): void => {
    setFormData((state) => ({ ...state, parts: setPart(part, state) }));
  };

  const handleChangePeriod = (name: InputFinancialPeriod, value: FinancialPeriodValue): void => {
    if (name === "partCount") {
      setFormData((state) => ({ ...state, [name]: value, parts: shapeParts(value, state.parts) }));
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitForm = (evt: MouseEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (isFieldsValid()) onEditReport(formData);
  };

  return (
    <form className={cls.join(" ")} onSubmit={handleSubmitForm}>
      <FieldsetPeriod
        month={formData.month}
        partCount={formData.partCount}
        onChangePeriod={handleChangePeriod}
        setValidationCallback={setValidationPeriodCallbacks}
      />

      <FinancialFieldsetPartList
        parts={formData.parts}
        onChangePart={handleChangePart}
        setValidationCallbacks={setValidationPartsCallbacks}
      />

      <BaseButton className={"mt-auto"} type={"submit"} disabled={formData.parts.length === 0} secondary fullWith>
        Save
      </BaseButton>
    </form>
  );
}
