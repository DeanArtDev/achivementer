import { useState, Dispatch, SetStateAction } from "react";
import { FinancialReport, InputFinancialReport } from "providers/api/FinancialRequestProvider/types";

type FinancesPeriodEditorController = [InputFinancialReport, Dispatch<SetStateAction<InputFinancialReport>>];

export default function useController(initialFormData?: FinancialReport): FinancesPeriodEditorController {
  const [formData, setFormData] = useState<InputFinancialReport | FinancialReport>(
    initialFormData || {
      period: {
        month: new Date().getMonth(),
        part: 0,
      },
      income: 0,
      percents: {
        common: 0,
        piggyBank: 0,
        free: 0,
      },
    }
  );

  return [formData, setFormData];
}
