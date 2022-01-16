import { useEffect, useRef, useState } from "react";
import { PLACEHOLDER_VALUE } from "./consts";
import { Predicate } from "type";
import { UseSelectValidation } from "./types";
import changeFunctionName from "utils/changeFunctionName";

export default function useSelectValidation(name: string, required: boolean): UseSelectValidation {
  const [isValid, setIsValid] = useState(false);
  const [isShowError, setIsShowError] = useState(false);
  const isFirstChange = useRef(false);

  const validate = (value: string) => {
    isFirstChange.current = true;
    if (value === PLACEHOLDER_VALUE) {
      setIsValid(false);
      return false;
    }

    setIsValid(true);
    return true;
  };

  const validatingCallback = () => {
    if (required) {
      setIsShowError(!isValid);
      return isValid;
    }
    return true;
  };

  useEffect(() => {
    if (!isFirstChange.current) {
      setIsShowError(false);
      return;
    }

    setIsShowError(!isValid);
  }, [isValid]);

  return [isValid, isShowError, validate, changeFunctionName<Predicate>(name, validatingCallback)];
}
