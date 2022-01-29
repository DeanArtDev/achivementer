import { Predicate, PredicateMap } from "type";
import { useRef } from "react";

export default function useViewController(): [
  (predicatesMap: PredicateMap) => void,
  (predicate: Predicate) => void,
  Predicate
] {
  const validationPeriodCallbacks = useRef<PredicateMap>({});
  const validationPartsCallbacks = useRef<PredicateMap>({});

  const isFieldsValid = (): boolean => {
    return Object.values<Predicate>({ ...validationPartsCallbacks.current, ...validationPeriodCallbacks.current })
      .map((cb) => cb())
      .every((r) => r);
  };

  const setValidationPartsCallbacks = (predicatesMap: PredicateMap): void => {
    validationPartsCallbacks.current = predicatesMap;
  };

  const setValidationPeriodCallbacks = (predicate: Predicate) => {
    validationPeriodCallbacks.current = { ...validationPeriodCallbacks.current, [predicate.name]: predicate };
  };

  return [setValidationPartsCallbacks, setValidationPeriodCallbacks, isFieldsValid];
}
