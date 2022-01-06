import { useEffect } from "react";
import { FinancialPercents } from "../../../../types";
import { ValidatingCallbacks } from "../../types";
import useFieldValidation from "hooks/useFieldValidation";

type ValidatedFieldset = {
  commonPercent: boolean;
  piggyBankPercent: boolean;
  freePercent: boolean;
};

export default function useController(
  percents: FinancialPercents,
  getCallbacks?: ValidatingCallbacks
): ValidatedFieldset {
  const [isFieldValid, getValidatingCallbacks] = useFieldValidation<ValidatedFieldset>(
    { commonPercent: true, piggyBankPercent: true, freePercent: true },
    {
      commonPercent: () => !!percents.commonPercent,
      piggyBankPercent: () => !!percents.piggyBankPercent,
      freePercent: () => !!percents.freePercent,
    },
    "percent"
  );

  useEffect(() => {
    getCallbacks && getCallbacks(getValidatingCallbacks());
  }, [percents]);

  return isFieldValid;
}
