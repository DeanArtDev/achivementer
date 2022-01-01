import { useState } from "react";
import { Predicate } from "type";

type ValidatedFields<T> = {
  [I in keyof T]: boolean;
};

type ValidatingPredicates<T> = {
  [I in keyof ValidatedFields<T>]: Predicate;
};

export default function useFieldValidation<T>(
  initialFieldValues: ValidatedFields<T>,
  predicates: ValidatingPredicates<T>,
  functionNamePrefix?: string
): [ValidatedFields<T>, () => Predicate[]] {
  const [isFieldValid, setIsFieldValid] = useState<ValidatedFields<T>>(initialFieldValues);

  const validate = (name: keyof ValidatedFields<T>, isValid: boolean) => {
    if (isFieldValid[name] === isValid) return isValid;
    setIsFieldValid((state) => ({ ...state, [name]: isValid }));
    return isValid;
  };

  const getValidatingCallbacks = (): Predicate[] => {
    const validatingCallbacks: Predicate[] = [];
    for (const field in isFieldValid) {
      const fn = () => validate(field, predicates[field]());
      Object.defineProperty<Predicate>(fn, "name", {
        value: `${field}${functionNamePrefix ? "_" + functionNamePrefix : ""}`,
        writable: true,
      });
      validatingCallbacks.push(fn);
    }

    return validatingCallbacks;
  };

  return [isFieldValid, getValidatingCallbacks];
}
