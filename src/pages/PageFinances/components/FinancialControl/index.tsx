import React from "react";
import { ReactComponent as LeftArrowIcon } from "assets/images/icons/left-arrow.svg";
import BaseButton from "UI/BaseButton";

import "./style.scss";

type Props = {
  onAddClick: () => void;
  onBackClick: () => void;
};

export default function FinancialControl({ onAddClick, onBackClick }: Props) {
  return (
    <ul className={"finance-control pr-4 py-2"}>
      <li className={"finance-control__item mr-auto"}>
        <BaseButton className={"py-2 px-4"} icon onClick={onBackClick}>
          <LeftArrowIcon width={24} height={24} />
        </BaseButton>
      </li>
      <li className={"finance-control__item ml-auto"}>
        <BaseButton className={"fw-light"} onClick={onAddClick}>
          Add report
        </BaseButton>
      </li>
    </ul>
  );
}
