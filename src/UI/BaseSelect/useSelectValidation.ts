import { useEffect, useRef, useState } from "react";
import { PLACEHOLDER_VALUE } from "./consts";
import { BaseOption } from "types";

export type UseSelectValidation = {
  isValid: boolean;
  isShowError: boolean;
  validate: (value: string) => boolean;
};

export default function useSelectValidation(
  name: string,
  options: BaseOption[],
  required: boolean
): UseSelectValidation {
  const [isValid, setIsValid] = useState(false);
  const [isShowError, setIsShowError] = useState(false);
  const isFirstChange = useRef(false);

  const validate = (value: string) => {
    isFirstChange.current = true;
    if (value === PLACEHOLDER_VALUE) {
      setIsValid(false);
      return false;
    }
    if (options.every((o) => o.value !== value)) {
      setIsValid(false);
      return false;
    }

    setIsValid(true);
    return true;
  };

  useEffect(() => {
    if (!isFirstChange.current) {
      setIsShowError(false);
      return;
    }

    setIsShowError(!isValid);
  }, [isValid]);

  return { isValid, isShowError, validate };
}
