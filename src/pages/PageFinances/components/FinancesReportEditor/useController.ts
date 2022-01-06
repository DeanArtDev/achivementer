import React, { useState } from "react";
import { Predicate } from "type";
import { FinancialReport } from "../../types";
import { numericToZeroStringAdapter } from "utils/adapters";
import { values } from "lodash-es";

type PredicateCallbackMap = Record<Predicate["name"], Predicate>;

type FinancesPeriodEditorController = [
  FinancialReport,
  React.Dispatch<React.SetStateAction<FinancialReport>>,
  Predicate,
  (arr: Predicate[]) => PredicateCallbackMap,
  React.Dispatch<React.SetStateAction<PredicateCallbackMap>>
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

export default function useController(): FinancesPeriodEditorController {
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

  const [validationCallbacksBuffer, setValidationCallbacksBuffer] = useState<PredicateCallbackMap>({});

  const isFieldsValid = (): boolean => {
    const callbacksList = values(validationCallbacksBuffer).filter((cb) => !cb());
    return callbacksList.length === 0;
  };

  return [formData, setFormData, isFieldsValid, callbacksArrayToMap, setValidationCallbacksBuffer];
}
