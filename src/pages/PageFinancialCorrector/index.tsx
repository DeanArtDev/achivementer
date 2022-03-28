import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as LeftArrowIcon } from "assets/images/icons/left-arrow.svg";
import useRouterHistory from "hooks/useRouterHistory";
import BaseHeader from "UI/BaseHeader";
import BaseMain from "UI/BaseMain";
import BaseButton from "UI/BaseButton";
import "./style.scss";

export default function FinancialCorrector() {
  const history = useHistory();
  const { getLocation } = useRouterHistory();

  return (
    <div className={"financial-corrector d-flex __column"}>
      <BaseHeader className={"financial-corrector__header container-narrow mb-4"}>
        <BaseButton className={"py-2 px-4"} icon onClick={history.goBack}>
          <LeftArrowIcon width={24} height={24} />
        </BaseButton>
        <h1 className={"financial-corrector__title"}>Financial Corrector</h1>
      </BaseHeader>
      <BaseMain className={"financial-corrector__main container-narrow"}>
        <BaseButton to={getLocation("/logout")}>CLick</BaseButton>
      </BaseMain>
    </div>
  );
}
