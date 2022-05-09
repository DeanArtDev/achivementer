import { useState } from "react";
import { BaseOption } from "types";
import { PLACEHOLDER_VALUE } from "./consts";

export type UseSelectValidation = {
  isShowError: boolean;
  validate: (value?: string) => boolean;
};

export default function useSelectValidation(value: BaseOption["value"], options: BaseOption[]): UseSelectValidation {
  const [isShowError, setIsShowError] = useState(false);

  const validate = (newValue?: string) => {
    const trimmedValue = newValue?.trim() ?? value;

    if (trimmedValue === PLACEHOLDER_VALUE) {
      setIsShowError(true);
      return false;
    }
    if (options.every((o) => o.value !== trimmedValue)) {
      setIsShowError(true);
      return false;
    }
    setIsShowError(false);
    return true;
  };

  return { isShowError, validate };
}
