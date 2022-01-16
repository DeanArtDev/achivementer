import React, { ChangeEvent, useEffect, useState } from "react";
import { BaseOption, Predicate } from "type";
import { ReactComponent as BottomArrowIcon } from "assets/images/icons/bottom-arrow.svg";
import { PLACEHOLDER_VALUE } from "./consts";
import useSelectValidation from "./useSelectValidation";

import "./style.scss";

type Props = {
  name: string;
  className?: string;
  required?: boolean;
  options: BaseOption[];
  valid?: boolean;
  size?: number;
  placeholder?: string;
  onChange: (value: string) => void;
  setValidationCallback?: (predicate: Predicate) => void;
};

const defaultPlaceholder = (placeholder: string) => {
  return { value: PLACEHOLDER_VALUE, hidden: true, disabled: true, text: placeholder };
};

export default function BaseSelect({
  size,
  name,
  options,
  className,
  required = false,
  placeholder = "Empty",
  onChange,
  setValidationCallback,
}: Props) {
  const [isValid, isShowError, validate, validatingCallback] = useSelectValidation(name, required);

  const cls = ["base-select"];
  if (className) cls.push(className);
  if (isShowError) cls.push("__invalid");

  const [withPlaceholderOptions] = useState<BaseOption[]>([defaultPlaceholder(placeholder), ...options]);

  const [isPlaceholderShowed, setPlaceholder] = useState(true);
  if (isPlaceholderShowed) cls.push("__placeholder");
  const handeSelectChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const target = evt.target;
    if (validate(target.value)) {
      setPlaceholder(false);
      onChange(target.value);
    }
  };

  const isEmpty = options.length === 0;
  if (isEmpty) cls.push("__empty");

  useEffect(() => {
    setValidationCallback && setValidationCallback(validatingCallback);
  }, [isValid]);

  return (
    <div className={cls.join(" ")}>
      <BottomArrowIcon className={"base-select__icon"} width={24} height={24} />

      <select size={size} name={name} required defaultValue={PLACEHOLDER_VALUE} onChange={handeSelectChange}>
        {withPlaceholderOptions.map((o) => (
          <option
            className={"base-select__option"}
            key={o.value}
            value={o.value}
            hidden={o.hidden}
            disabled={o.disabled}
          >
            {o.text}
          </option>
        ))}
      </select>
    </div>
  );
}
