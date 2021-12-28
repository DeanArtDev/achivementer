import React from "react";
import BaseInput from "components/BaseInput";

import "./style.scss";

type Props = {
  className?: string;
};

export default function FieldsetPercent({ className }: Props) {
  const cls = ["fieldset-percent"];
  if (className) cls.push(className);

  return (
    <fieldset className={cls.join(" ")}>
      <legend className={"mb-2"}>Percents &quot;%&quot;:</legend>

      <div className={"fieldset-percent__wrapper"}>
        <BaseInput className={"fieldset-percent__input pa-3"} type="number" name="common-percent" placeholder={"50"} />

        <BaseInput
          className={"fieldset-percent__input pa-3"}
          type="number"
          name="piggy-bank-percent"
          placeholder={"20"}
        />
        <BaseInput className={"fieldset-percent__input pa-3"} type="number" name="free-percent" placeholder={"30"} />
      </div>
    </fieldset>
  );
}
