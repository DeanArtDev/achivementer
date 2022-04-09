import { useRef, useState } from "react";

export default function useViewController(): {
  setPartsValidation: (isValid: boolean) => void;
  setPeriodValidation: (isValid: boolean) => void;
  isAllFieldsValid: boolean;
} {
  const [isAllFieldsValid, setIsAllFieldsValid] = useState(false);

  const validationParts = useRef<boolean>(false);
  const validationPeriod = useRef<boolean>(false);
  const checkAllValidation = () => {
    if (isAllFieldsValid && (!validationParts.current || !validationPeriod.current)) {
      setIsAllFieldsValid(false);
    }
    if (validationParts.current && validationPeriod.current) {
      setIsAllFieldsValid(true);
    }
  };

  const setPartsValidation = (isValid: boolean): void => {
    validationParts.current = isValid;
    checkAllValidation();
  };

  const setPeriodValidation = (isValid: boolean): void => {
    validationPeriod.current = isValid;
    checkAllValidation();
  };

  return { setPartsValidation, setPeriodValidation, isAllFieldsValid };
}
