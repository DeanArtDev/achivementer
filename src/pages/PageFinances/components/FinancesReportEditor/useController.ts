import { useState, Dispatch, SetStateAction, useRef, MutableRefObject } from "react";
import { FinancialPart, FinancialReportFormData } from "providers/api/FinancialReportProvider/types";
import { Predicate, PredicateMap } from "type";
import { v1 as uuidv1 } from "uuid";
import { dropRight } from "lodash-es";

type FinancesPeriodEditorController = [
  FinancialReportFormData,
  Dispatch<SetStateAction<FinancialReportFormData>>,
  (partCount: number, parts: FinancialPart[]) => FinancialPart[],
  MutableRefObject<PredicateMap>,
  MutableRefObject<PredicateMap>,
  Predicate
];

export default function useController(): FinancesPeriodEditorController {
  const [formData, setFormData] = useState<FinancialReportFormData>({
    period: {
      month: new Date().getMonth(),
      partCount: 0,
    },
    parts: [],
  });

  const validationPeriodCallbacks = useRef<PredicateMap>({});
  const validationPartsCallbacks = useRef<PredicateMap>({});
  const isFieldsValid = (): boolean => {
    return Object.values<Predicate>({ ...validationPartsCallbacks.current, ...validationPeriodCallbacks.current })
      .map((cb) => cb())
      .every((r) => r);
  };

  const addNewParts = (count: number): FinancialPart[] => {
    return new Array(count).fill("").map(() => ({
      id: uuidv1(),
      income: 0,
      common: 0,
      piggyBank: 0,
      free: 0,
    }));
  };
  const shapeParts = (partCount: number, parts: FinancialPart[]): FinancialPart[] => {
    if (parts.length === 0) {
      return addNewParts(partCount);
    }

    const offset = parts.length - partCount;
    if (offset > 0) {
      return dropRight(parts, offset);
    }
    if (offset < 0) {
      return [...parts, ...addNewParts(Math.abs(offset))];
    }

    return [];
  };

  return [formData, setFormData, shapeParts, validationPartsCallbacks, validationPeriodCallbacks, isFieldsValid];
}
