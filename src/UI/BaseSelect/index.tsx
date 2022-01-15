import React, { ChangeEvent, useState } from "react";
import { BaseOption } from "type";
import { ReactComponent as BottomArrowIcon } from "assets/images/icons/bottom-arrow.svg";

import "./style.scss";

type Props = {
  name?: string;
  className?: string;
  required?: boolean;
  options: BaseOption<number>[];
  valid?: boolean;
  size?: number;
  placeholder?: string;
  onChange: (value: string) => void;
};

const PLACEHOLDER_VALUE = -1;

const defaultPlaceholder = (placeholder: string) => {
  return { value: PLACEHOLDER_VALUE, hidden: true, disabled: true, text: placeholder };
};

export default function BaseSelect({
  size,
  name,
  options,
  className,
  valid = true,
  placeholder = "Empty",
  onChange,
}: Props) {
  const cls = ["base-select"];
  if (className) cls.push(className);
  if (!valid) cls.push("__invalid");

  const [withPlaceholderOptions] = useState<BaseOption<number>[]>([defaultPlaceholder(placeholder), ...options]);

  const [isPlaceholderShowed, setPlaceholder] = useState(true);
  if (isPlaceholderShowed) cls.push("__placeholder");
  const handeSelectChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const target = evt.target;
    if (Number(target.value) !== PLACEHOLDER_VALUE) {
      setPlaceholder(false);
      onChange(target.value);
    }
  };

  const isEmpty = options.length === 0;
  if (isEmpty) cls.push("__empty");

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
