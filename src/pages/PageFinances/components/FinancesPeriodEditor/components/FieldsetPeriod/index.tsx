import React from "react";
import BaseInput from "components/BaseInput";

import "./style.scss";

type Props = {
  className?: string;
};

export default function FieldsetPeriod({ className }: Props) {
  const cls = ["fieldset-period"];
  if (className) cls.push(className);

  return (
    <fieldset className={cls.join(" ")}>
      <legend className={"mb-2"}>Period:</legend>

      <div className={"fieldset-period__wrapper"}>
        <label className={"fieldset-period__label"} htmlFor={"period"}>
          <span className={"fieldset-period__text mb-2"}>Month</span>
          <BaseInput className={"fieldset-period__type pa-3"} id={"period"} name={"period"} type={"month"} />
        </label>

        <label className={"fieldset-period__label"} htmlFor={"part"}>
          <span className={"fieldset-period__text mb-2"}>Part</span>
          <BaseInput
            className={"fieldset-period__part pa-3"}
            id={"part"}
            name={"part"}
            type={"number"}
            placeholder={"1"}
          />
        </label>
      </div>
    </fieldset>
  );
}
