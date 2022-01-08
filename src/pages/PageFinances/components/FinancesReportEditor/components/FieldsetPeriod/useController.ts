import { useEffect, useMemo } from "react";
import { FinancialPeriod } from "providers/api/FinancialRequestProvider/types";
import { BaseOption } from "type";
import { ValidatingCallbacks } from "../../types";
import useFieldValidation from "hooks/useFieldValidation";
import { Month } from "consts";
import { PARTS_LIMIT } from "../../consts";

type ValidatedFieldset = { [I in keyof FinancialPeriod]: boolean };
type FieldsetPeriodController = [ValidatedFieldset, BaseOption<number>[], BaseOption<number>[]];

export default function useController(
  period: FinancialPeriod,
  getCallbacks?: ValidatingCallbacks
): FieldsetPeriodController {
  const [isFieldValid, getValidatingCallbacks] = useFieldValidation<ValidatedFieldset>(
    {
      part: true,
      month: true,
    },
    {
      part: () => !!period.part,
      month: () => !!period.month,
    },
    "period"
  );

  useEffect(() => {
    getCallbacks && getCallbacks(getValidatingCallbacks());
  }, [period]);

  const periodOptions = useMemo(() => {
    return Object.values(Month).reduce<BaseOption<number>[]>((acc, i) => {
      if (typeof i === "number") acc.push({ value: i, text: Month[i] });
      return acc;
    }, []);
  }, [Month]);

  const partOptions = new Array(PARTS_LIMIT - 1)
    .fill("")
    .map<BaseOption<number>>((_, i) => ({ value: i + 1, text: String(i + 1) }));

  return [isFieldValid, periodOptions, partOptions];
}
