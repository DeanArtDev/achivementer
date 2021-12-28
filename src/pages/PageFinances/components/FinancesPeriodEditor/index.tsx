import React, { PropsWithChildren } from "react";
import BaseInput from "../../../../components/BaseInput";
import FieldsetPeriod from "./components/FieldsetPeriod";

// import "./style.scss";
// type Props = {};

export default function FinancesPeriodEditor(props: PropsWithChildren<any>) {
  return (
    <form className={"finance-form mb-5"}>
      <FieldsetPeriod className={"mb-4"} />

      <fieldset className={"mb-4"}>
        <legend className={"mb-2"}>Period income:</legend>
        <div className={"finance-form__income-wrapper"}>
          <BaseInput className={"finance-form__income pa-3 mb-2"} type="number" name="income" placeholder={"20000"} />
        </div>
      </fieldset>

      <fieldset>
        <legend className={"mb-2"}>Percents &quot;%&quot;:</legend>
        <div className={"finance-form__percent-wrapper"}>
          <BaseInput className={"finance-form__percent pa-3"} type="number" name="common-percent" placeholder={"50"} />
          <BaseInput
            className={"finance-form__percent pa-3"}
            type="number"
            name="piggy-bank-percent"
            placeholder={"20"}
          />
          <BaseInput className={"finance-form__percent pa-3"} type="number" name="free-percent" placeholder={"30"} />
        </div>
      </fieldset>
    </form>
  );
}
