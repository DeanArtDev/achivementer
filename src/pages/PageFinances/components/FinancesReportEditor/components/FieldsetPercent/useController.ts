import { useEffect } from "react";
import { FinancialPercents } from "../../../../../../providers/api/FinancialRequestProvider/types";
import { ValidatingCallbacks } from "../../types";
import useFieldValidation from "hooks/useFieldValidation";

type ValidatedFieldset = {
  common: boolean;
  piggyBank: boolean;
  free: boolean;
};

export default function useController(
  percents: FinancialPercents,
  getCallbacks?: ValidatingCallbacks
): ValidatedFieldset {
  const [isFieldValid, getValidatingCallbacks] = useFieldValidation<ValidatedFieldset>(
    { common: true, piggyBank: true, free: true },
    {
      common: () => !!percents.common,
      piggyBank: () => !!percents.piggyBank,
      free: () => !!percents.free,
    },
    "percent"
  );

  useEffect(() => {
    getCallbacks && getCallbacks(getValidatingCallbacks());
  }, [percents]);

  return isFieldValid;
}
