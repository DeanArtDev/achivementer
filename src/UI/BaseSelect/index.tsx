import React, { ChangeEvent, useEffect, useState } from "react";
import { BaseOption } from "types";
import { ReactComponent as BottomArrowIcon } from "assets/images/icons/bottom-arrow.svg";
import { PLACEHOLDER_VALUE } from "./consts";
import useSelectValidation from "./useSelectValidation";
import "./style.scss";

type Props = {
  name: string;
  className?: string;
  required?: boolean;
  options: BaseOption[];
  value?: BaseOption["value"];
  isValid?: boolean;
  size?: number;
  placeholder?: string;
  onChange: (value: string) => void;
  getValidate?: (validate: (value?: string) => boolean) => void;
};

const defaultPlaceholder = (placeholder: string) => {
  return { value: PLACEHOLDER_VALUE, disabled: true, text: placeholder };
};

export default function BaseSelect({
  size,
  name,
  value = "",
  options,
  required,
  className,
  placeholder = "Empty",
  onChange,
  getValidate,
}: Props) {
  const [withPlaceholderOptions] = useState<BaseOption[]>([defaultPlaceholder(placeholder), ...options]);
  const computedValue = value === "" ? withPlaceholderOptions[0].value : value;

  const { isShowError, validate } = useSelectValidation(computedValue, options);
  const [isPlaceholderShowed, setPlaceholder] = useState(value === "");

  const cls = ["base-select"];
  if (className) cls.push(className);
  if (isShowError) cls.push("__invalid");
  if (options.length === 0) cls.push("__empty");
  if (isPlaceholderShowed) cls.push("__placeholder");

  const handeSelectChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const target = evt.target;
    if (validate(target.value)) {
      setPlaceholder(false);
      onChange(target.value);
    }
  };

  //todo: попробовть переписать на useEffectOnce, но есть проблемма. validate замыкается на старом значении value и создается разсинхрон значений
  useEffect(() => {
    getValidate && getValidate(validate);
  });

  return (
    <div className={cls.join(" ")}>
      <BottomArrowIcon className={"base-select__icon"} width={24} height={24} />

      <select size={size} name={name} value={computedValue} required={required} onChange={handeSelectChange}>
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
