import React, { useState } from "react";
import { FinancialReport } from "providers/api/FinancialReportProvider/types";
import { ReactComponent as LeftArrowIcon } from "assets/images/icons/left-arrow.svg";
import { classes } from "utils/templateHelpers";
import useViewController from "./useViewController";
import BaseButton from "UI/BaseButton";
import FinancialPartList from "./components/FinancialPartList";
import FinancialReportManageMenu from "./components/FinancialReportManageMenu";

import "./style.scss";

type Props = {
  className?: string;
  report: FinancialReport;
  onDelete: (id: string) => void;
};

export default function FinancialReportDetails({ className, onDelete, report }: Props) {
  const cls = ["finance-report-details-details"];
  if (className) cls.push(className);

  const [title, totalAmount] = useViewController(report);

  const [isShowDetails, setIsShowDetails] = useState(false);

  return (
    <div className={cls.join(" ")}>
      <div className={"finance-report-details__header px-3"}>
        <h3 className={"finance-report-details__title mr-auto"}>{title}</h3>

        <FinancialReportManageMenu
          className={"finance-report-details__menu pa-2 ml-auto"}
          onDelete={() => onDelete(report.id)}
        />

        <span className={"finance-report-details__total-income mr-auto"}>
          Total income: <span>{totalAmount}</span>
        </span>
        <BaseButton
          className={classes("finance-report-details__show-btn ml-auto pa-2", { __active: isShowDetails })}
          icon
          onClick={() => setIsShowDetails(!isShowDetails)}
        >
          <LeftArrowIcon width={18} height={18} />
        </BaseButton>
      </div>

      {isShowDetails && <FinancialPartList className={"pa-2 pt-0"} parts={report.parts} />}
    </div>
  );
}
