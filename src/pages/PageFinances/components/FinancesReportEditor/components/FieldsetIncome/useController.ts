import { useEffect } from "react";
import { ValidatingCallbacks } from "../../types";
import useFieldValidation from "hooks/useFieldValidation";

type ValidatedFieldset = {
  income: boolean;
};

export default function useController(income: number, getCallbacks?: ValidatingCallbacks): ValidatedFieldset {
  const [isFieldValid, getValidatingCallbacks] = useFieldValidation<ValidatedFieldset>(
    { income: true },
    { income: () => !!income },
    "income"
  );

  useEffect(() => {
    getCallbacks && getCallbacks(getValidatingCallbacks());
  }, [income]);

  return isFieldValid;
}
