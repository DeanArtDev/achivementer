import React, { MouseEvent } from "react";
import { FinancialPercentCorrection } from "providers/api/FinancialReportProvider/types";
import { ReactComponent as CrossIcon } from "assets/images/icons/close-cross.svg";
import { classes } from "utils/templateHelpers";
import BaseButton from "UI/BaseButton";
import "./style.scss";

type Props = {
  correction: FinancialPercentCorrection;
  className?: string;
  hide?: boolean;
  onEdit?: (id: FinancialPercentCorrection["id"]) => void;
  onDelete?: (id: FinancialPercentCorrection["id"]) => void;
};

const ICON_SIZE = 16;

export default function PercentCorrectionView({
  className,
  correction: { id, name, amount },
  hide = false,
  onEdit,
  onDelete,
}: Props) {
  const cls = ["percent-correction-view px-2"];
  if (className) cls.push(className);

  const handleCorrectionDelete = (evt: MouseEvent): void => {
    evt.stopPropagation();
    onDelete && onDelete(id);
  };

  return (
    <div className={classes(cls, { __hide: hide })} onClick={() => onEdit && onEdit(id)}>
      <div className="percent-correction-view__text-wrapper mr-6">
        <span className="percent-correction-view__name fw-bold">{name}:</span>
        <span className="percent-correction-view__amount">-{amount}</span>
      </div>
      <BaseButton className="percent-corrector__delete-btn px-2" icon onClick={handleCorrectionDelete}>
        <CrossIcon width={ICON_SIZE} height={ICON_SIZE} />
      </BaseButton>
    </div>
  );
}
