import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as LeftArrowIcon } from "assets/images/icons/left-arrow.svg";
import BaseHeader from "UI/BaseHeader";
import BaseMain from "UI/BaseMain";
import BaseButton from "UI/BaseButton";
import BasePage from "UI/BasePage";
import useController from "./useController";
import PartCorrectionList from "./components/PartCorrectionList";
import "./style.scss";

export default function FinancialCorrector() {
  const history = useHistory();

  const { title, monthIncome, correctionPartList, loading } = useController();

  return (
    <BasePage className={"financial-corrector"}>
      <BaseHeader className={"financial-corrector__header container-narrow mb-4"}>
        <BaseButton className={"py-2 px-4"} icon onClick={history.goBack}>
          <LeftArrowIcon width={24} height={24} />
        </BaseButton>
        <h1 className={"financial-corrector__title"}>Financial Corrector</h1>
      </BaseHeader>

      <BaseMain className={"financial-corrector__main container-narrow"} loading={loading}>
        <h3 className={"financial-corrector__title"}>{title}</h3>
        <div className={"financial-corrector__total mb-3"}>
          Month income: <span>{monthIncome}</span>
        </div>

        {correctionPartList?.length > 0 && (
          <ul className={"financial-corrector__part-list"}>
            {correctionPartList.map((i, index) => (
              <li className={"financial-corrector__item"} key={index}>
                <PartCorrectionList percentEntity={i} partCount={index} />
              </li>
            ))}
          </ul>
        )}
      </BaseMain>
    </BasePage>
  );
}
