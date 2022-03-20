import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { ReactComponent as LeftArrowIcon } from "assets/images/icons/left-arrow.svg";
import BaseHeader from "UI/BaseHeader";
import BaseMain from "UI/BasePage";
import BaseButton from "UI/BaseButton";

import "./style.scss";

type Props = {
  className?: string;
};

export default function FinancialCorrector({ className }: Props) {
  const params = useParams();
  const history = useHistory();

  return (
    <div className={"financial-corrector d-flex __column"}>
      <BaseHeader className={"financial-corrector__header container-narrow pr-4 mb-4"}>
        <BaseButton className={"py-2 px-4"} icon onClick={history.goBack}>
          <LeftArrowIcon width={24} height={24} />
        </BaseButton>
        <h1 className={"financial-corrector__title"}>Financial Corrector</h1>
      </BaseHeader>
      <BaseMain className={"financial-corrector__main container-narrow"}>hello</BaseMain>
    </div>
  );
}
