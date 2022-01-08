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
  onChange: (value: string) => void;
};

export default function BaseSelect({ className, options, size, name, valid = true, onChange }: Props) {
  const cls = ["base-select"];
  if (className) cls.push(className);
  if (!valid) cls.push("__invalid");

  const optionsWithPlaceholder: BaseOption<number>[] = [{ value: -1, text: "Empty" }, ...options];

  const [placeholder, setPlaceholder] = useState(true);
  if (placeholder) cls.push("__placeholder");
  const handeSelectChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const target = evt.target;
    if (Number(target.value) !== optionsWithPlaceholder[0].value) {
      setPlaceholder(false);
      onChange(target.value);
    }
  };

  return (
    <div className={cls.join(" ")}>
      <BottomArrowIcon className={"base-select__icon"} width={24} height={24} />

      <select size={size} name={name} defaultValue={optionsWithPlaceholder[0].value} required onChange={handeSelectChange}>
        {optionsWithPlaceholder.map((o, index) => (
          <option
            className={"base-select__option"}
            key={o.value}
            value={o.value}
            hidden={index === 0}
            disabled={index === 0}
          >
            {o.text}
          </option>
        ))}
      </select>
    </div>
  );
}
