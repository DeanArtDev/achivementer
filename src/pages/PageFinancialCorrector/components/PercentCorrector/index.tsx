import React, { useRef, useState } from "react";
import {
  FinancialPercentCorrection,
  InputFinancialPercentCorrection,
} from "providers/api/FinancialReportProvider/types";
import { PercentEntity } from "../../types";
import { calculatePercentage } from "utils/calculatePercentage";
import { classes } from "utils/templateHelpers";
import { PartName } from "./config";
import AddPercentCorrection from "./components/AddPercentCorrection";
import PercentCorrectionEditor from "./components/PercentCorrectionEditor";
import PercentCorrectionView from "./components/PercentCorrectionView";
import PercentCorrectorConfirmation from "./components/PercentCorrectorConfirmation";
import "./style.scss";

type Props = {
  percentEntity: PercentEntity;
  className?: string;
  onUpdatePercentCorrection?: (
    correction: FinancialPercentCorrection | InputFinancialPercentCorrection,
    id?: PercentEntity["id"]
  ) => void;
  onDeletePercentCorrection?: (id: FinancialPercentCorrection["id"]) => void;
};

const computeSumFormPartIncome = (income: number, percent: number): number => {
  return Number(calculatePercentage(income, Number(percent)).toFixed(2));
};

export default function PercentCorrector({
  className,
  percentEntity: { id, name, partIncome, percentFormIncome, corrections },
  onUpdatePercentCorrection,
  onDeletePercentCorrection,
}: Props) {
  const cls = ["percent-corrector flex-column"];
  if (className) cls.push(className);

  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const correction = useRef<FinancialPercentCorrection | undefined>();

  const hasCorrections = corrections.length > 0;

  const partTotal = computeSumFormPartIncome(partIncome, percentFormIncome);
  const correctionTotalAmount = corrections.reduce<number>((acc, c) => (acc += Number(c.amount)), 0);
  const balance = partTotal - correctionTotalAmount;

  const hasChanges = (checkingCorrection: FinancialPercentCorrection | InputFinancialPercentCorrection): boolean => {
    return (
      checkingCorrection.name !== correction.current?.name || checkingCorrection.amount !== correction.current?.amount
    );
  };

  const handleEditorAccept = (
    updatedCorrection: FinancialPercentCorrection | InputFinancialPercentCorrection
  ): void => {
    if (onUpdatePercentCorrection && hasChanges(updatedCorrection)) {
      onUpdatePercentCorrection(updatedCorrection, id);
    }

    correction.current = undefined;
    setIsEdit(false);
  };

  const handleEditorDecline = () => {
    correction.current = undefined;
    setIsEdit(false);
  };

  const handeCorrectionEdit = (id: FinancialPercentCorrection["id"]): void => {
    correction.current = corrections.find((c) => c.id === id);
    setIsEdit(true);
  };

  const deletingCorrectionId = useRef<FinancialPercentCorrection["id"] | null>(null);
  const handleCorrectionDelete = (id: FinancialPercentCorrection["id"]): void => {
    deletingCorrectionId.current = id;
    setShowDeleteConfirm(true);
  };

  const handleConfirmationConfirm = () => {
    if (onDeletePercentCorrection) {
      onDeletePercentCorrection(deletingCorrectionId.current ?? "");
    }
    correction.current = undefined;
    deletingCorrectionId.current = null;
    setShowDeleteConfirm(false);
  };

  // todo: подумать как сделать что бы editor появлялся под редактируемым полем а не снизу.
  return (
    <div className={cls.join(" ")}>
      <span className="percent-corrector__title mb-4">
        {`${PartName[name]}: ${percentFormIncome}%`}
        <span className="percent-corrector__total">{partTotal}</span>
      </span>

      {hasCorrections && (
        <div className="percent-corrector__correction-wrapper mb-2">
          {corrections.map((c) => (
            <PercentCorrectionView
              correction={c}
              key={c.id}
              onEdit={handeCorrectionEdit}
              onDelete={handleCorrectionDelete}
            />
          ))}
        </div>
      )}

      {isEdit ? (
        <PercentCorrectionEditor
          className={"mt-3"}
          correction={correction.current}
          onAccept={handleEditorAccept}
          onDecline={handleEditorDecline}
        />
      ) : (
        <AddPercentCorrection onClick={() => setIsEdit(true)} />
      )}

      {hasCorrections && (
        <div className="percent-corrector__balance mt-auto px-2">
          Balance: <span className={classes({ __red: balance < 0, __green: balance >= 0 })}>{balance}</span>
        </div>
      )}

      {showDeleteConfirm && (
        <PercentCorrectorConfirmation
          onConfirmModal={handleConfirmationConfirm}
          onCloseModal={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
