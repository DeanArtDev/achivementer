import { FinancialPeriod } from "../../../../types";
import { ValidatingCallbacks } from "../../types";
import useFieldValidation from "hooks/useFieldValidation";
import { useEffect } from "react";

type ValidatedFieldset = { [I in keyof FinancialPeriod]: boolean };

export default function useController(period: FinancialPeriod, getCallbacks?: ValidatingCallbacks): ValidatedFieldset {
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

  return isFieldValid;
}
