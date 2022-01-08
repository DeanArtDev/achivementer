import { useState, Dispatch, SetStateAction } from "react";
import { Predicate } from "type";
import { FinancialReport, InputFinancialReport } from "providers/api/FinancialRequestProvider/types";
import { numericToZeroStringAdapter } from "utils/adapters";
import { values } from "lodash-es";

type PredicateCallbackMap = Record<Predicate["name"], Predicate>;

type FinancesPeriodEditorController = [
  InputFinancialReport,
  Dispatch<SetStateAction<InputFinancialReport>>,
  Predicate,
  (arr: Predicate[]) => PredicateCallbackMap,
  Dispatch<SetStateAction<PredicateCallbackMap>>
];

export function callbacksArrayToMap(arr: Predicate[]): PredicateCallbackMap {
  return arr.reduce<PredicateCallbackMap>((acc, i) => {
    acc[i["name"]] = i;
    return acc;
  }, {});
}

const getInitialPeriodMonthValue = (): string => {
  const data = new Date();
  const month = numericToZeroStringAdapter(data.getMonth() + 1);
  return `${data.getFullYear()}-${month}`;
};

export default function useController(initialFormData?: FinancialReport): FinancesPeriodEditorController {
  const [formData, setFormData] = useState<InputFinancialReport | FinancialReport>(
    initialFormData || {
      period: {
        month: getInitialPeriodMonthValue(),
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

  const [validationCallbacksBuffer, setValidationCallbacksBuffer] = useState<PredicateCallbackMap>({});

  const isFieldsValid = (): boolean => {
    const callbacksList = values(validationCallbacksBuffer).filter((cb) => !cb());
    return callbacksList.length === 0;
  };

  return [formData, setFormData, isFieldsValid, callbacksArrayToMap, setValidationCallbacksBuffer];
}
