import React from "react";
import { ReactComponent as LeftArrowIcon } from "assets/images/icons/left-arrow.svg";
import BaseButton from "UI/BaseButton";

import "./style.scss";

type Props = {
  isEditMode: boolean;
  onAddClick: () => void;
  onBackClick: () => void;
};

export default function FinancialControl({ isEditMode, onAddClick, onBackClick }: Props) {
  return (
    <ul className={"finance-control px-4 py-2 mb-4"}>
      <li className={"finance-control__item mr-auto"}>
        {isEditMode && (
          <BaseButton className={"pa-0"} icon disabled={!isEditMode} onClick={onBackClick}>
            <LeftArrowIcon width={24} height={24} />
          </BaseButton>
        )}
      </li>
      <li className={"finance-control__item ml-auto"}>
        <BaseButton className={"fw-light"} disabled={isEditMode} onClick={onAddClick}>
          Add report
        </BaseButton>
      </li>
    </ul>
  );
}
