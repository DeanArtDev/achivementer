import React from "react";
import BasePage from "components/BasePage";
import BaseButton from "components/BaseButton";
import FinancesPeriodEditor from "./components/FinancesPeriodEditor";

import "./style.scss";

export default function PageFinances() {
  return (
    <BasePage className={"page-finances container-narrow"}>
      <ul className={"finance-control px-4 py-2 mb-4"}>
        <li className={"finance-control__item"}>
          <BaseButton className={"fw-light ml-auto"}>Add month</BaseButton>
        </li>
      </ul>

      <div className="page-finances__content pa-4">
        <FinancesPeriodEditor className={"mb-5"} />

        <BaseButton className={"mt-auto"} secondary fullWith>
          Save
        </BaseButton>
      </div>
    </BasePage>
  );
}
