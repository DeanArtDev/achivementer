import { useEffect, useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import { InputValidationOptions, Predicate } from "types";
import changeFunctionName from "utils/changeFunctionName";

type UseInputValidate = [boolean, boolean, (value: string) => boolean, () => boolean];

const checkByRegExp = (value: string, regexp: string): boolean => {
  const regExp = new RegExp(regexp);
  return regExp.test(value);
};

export default function useInputValidate(
  value: string,
  name: string,
  inputValidateOptions?: InputValidationOptions
): UseInputValidate {
  const { regexp, initialValue, require } = inputValidateOptions ?? {};
  const [isValid, setIsValid] = useState(initialValue ?? false);
  const [isShowError, setIsShowError] = useState(initialValue ? false : !isValid);
  const isFirstChange = useRef(false);

  const validate = (newValue: string): boolean => {
    const value = newValue;
    if (value === "") {
      setIsValid(false);
      return false;
    }

    if (regexp) {
      const checkedValue = checkByRegExp(value, regexp);
      setIsValid(checkedValue);
      return checkedValue;
    }

    setIsValid(true);
    return true;
  };

  const isCanChangeField = (newValue: string): boolean => {
    isFirstChange.current = true;
    const valid = validate(newValue);

    if (!valid && newValue === "") {
      return true;
    }

    return valid;
  };

  const validatingCallback = () => {
    if (require) {
      setIsShowError(!isValid);
      return isValid;
    }
    return true;
  };

  useEffect(() => {
    const trimmedValue = value;
    if ((trimmedValue === "" && isValid) || !isFirstChange.current) {
      setIsShowError(false);
      return;
    }

    if (trimmedValue === "" && require) {
      setIsShowError(true);
      return;
    }

    if (!isValid && trimmedValue.length > 1 && regexp && checkByRegExp(trimmedValue, regexp)) {
      setIsShowError(false);
      return;
    }

    setIsShowError(!isValid);
  }, [isValid]);

  useEffectOnce(() => {
    if (value !== "") validate(value);
  });

  return [
    isValid,
    isShowError,
    isCanChangeField,
    changeFunctionName<Predicate>(`${name}${inputValidateOptions?.predicateNameSpace ?? ""}`.trim(), validatingCallback),
  ];
}
