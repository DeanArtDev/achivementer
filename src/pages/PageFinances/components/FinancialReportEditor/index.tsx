import React, { MouseEvent } from "react";
import { FinancialPart, FinancialPeriodValue, FinancialReport } from "providers/api/FinancialReportProvider/types";
import { InputFinancialPeriod } from "./types";
import useController from "./сontroller";
import useFormValidate from "./useFormValidate";
import BaseButton from "UI/BaseButton";
import FieldsetPeriod from "./components/FieldsetPeriod";
import FinancialFieldsetPartList from "./components/FinancialFieldsetPartList";
import "./style.scss";

type Props = {
  className?: string;
  editedReport?: FinancialReport;
  onEditReport: (reportFormData: Omit<FinancialReport, "id"> | FinancialReport) => void;
};

const updateParts = (updatedPart: FinancialPart, state: Omit<FinancialReport, "id">): FinancialPart[] => {
  if (state.parts.length === 1) return [updatedPart];
  return state.parts.map((p) => (p.id === updatedPart.id ? updatedPart : p));
};

export default function FinancesReportEditor({ className, editedReport, onEditReport }: Props) {
  const cls = ["finance-report-editor"];
  if (className) cls.push(className);

  const [formData, setFormData, shapeParts] = useController(editedReport);
  const { setPeriodValidation, setPartsValidation, validate, partsValidatingResultMap } = useFormValidate();

  const handleChangePart = (part: FinancialPart): void => {
    setFormData((state) => ({ ...state, parts: updateParts(part, state) }));
  };

  const handleChangePeriod = (name: InputFinancialPeriod, value: FinancialPeriodValue): void => {
    if (name === "partCount") {
      setFormData((state) => ({ ...state, [name]: value, parts: shapeParts(value, state.parts) }));
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitForm = async (evt: MouseEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    if (validate()) onEditReport(formData);
  };

  return (
    <form className={cls.join(" ")} onSubmit={handleSubmitForm}>
      <FieldsetPeriod
        month={formData.month}
        partCount={formData.partCount}
        onChangePeriod={handleChangePeriod}
        getValidate={setPeriodValidation}
      />

      <FinancialFieldsetPartList
        parts={formData.parts}
        partListValidateResultMap={partsValidatingResultMap}
        onChangePart={handleChangePart}
        getValidate={setPartsValidation}
      />

      <BaseButton className={"finance-report-editor__submit-btn mt-auto"} type={"submit"} secondary fullWith>
        Save
      </BaseButton>
    </form>
  );
}
