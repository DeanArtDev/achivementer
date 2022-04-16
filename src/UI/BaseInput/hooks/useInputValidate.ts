import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InputValidationOptions } from "types";

type UseInputValidate = {
  isShowError: boolean;
  setIsShowError: Dispatch<SetStateAction<boolean>>;
  validate: (value?: string) => boolean;
};

const checkByRegExp = (value: string, regexp: string): boolean => {
  const regExp = new RegExp(regexp);
  return regExp.test(value);
};

export default function useInputValidate(
  value: string,
  inputValidateOptions?: InputValidationOptions
): UseInputValidate {
  const { regexp, initialValue, require, maxChars, forceValue } = inputValidateOptions ?? {};
  const [isShowError, setIsShowError] = useState(initialValue ? !initialValue : false);

  const validate = (newValue?: string): boolean => {
    const trimmedValue = newValue?.trim() ?? value;

    if (require && trimmedValue.length === 0) return false;
    if (maxChars && trimmedValue.length > maxChars) return false;
    if (regexp && !checkByRegExp(trimmedValue, regexp)) return false;
    return true;
  };

  useEffect(() => {
    if (typeof forceValue !== "boolean") return;
    setIsShowError(!forceValue);
  }, [forceValue]);

  return { isShowError, setIsShowError, validate };
}
