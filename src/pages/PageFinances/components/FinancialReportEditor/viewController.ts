import { useRef, useState } from "react";

export default function useViewController(): {
  setValidationParts: (isValid: boolean) => void;
  setValidationPeriod: (isValid: boolean) => void;
  isFieldsValid: boolean;
} {
  const [isFieldsValid, setIsFieldsValid] = useState(false);

  const validationParts = useRef<boolean>(false);
  const validationPeriod = useRef<boolean>(false);
  const checkAllValidation = () => {
    if (isFieldsValid && (!validationParts.current || !validationPeriod.current)) {
      setIsFieldsValid(false);
    }
    if (validationParts.current && validationPeriod.current) {
      setIsFieldsValid(true);
    }
  };

  const setValidationParts = (isValid: boolean): void => {
    validationParts.current = isValid;
    checkAllValidation();
  };

  const setValidationPeriod = (isValid: boolean): void => {
    validationPeriod.current = isValid;
    checkAllValidation();
  };

  return { setValidationParts, setValidationPeriod, isFieldsValid };
}
