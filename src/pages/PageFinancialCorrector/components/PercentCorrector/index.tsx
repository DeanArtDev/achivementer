import React, { useRef, useState } from "react";
import { Correction, CorrectionPure } from "providers/api/CorrectionProvider/types";
import { CreateOrUpdateCorrectionData, EditedCorrection, PercentEntity } from "../../types";
import { calculatePercentage } from "utils/calculatePercentage";
import { classes } from "utils/templateHelpers";
import { guardOneOf } from "utils/typeGuards";
import { PartName } from "./config";
import AddPercentCorrection from "./components/AddPercentCorrection";
import PercentCorrectionEditor from "./components/PercentCorrectionEditor";
import PercentCorrectionView from "./components/PercentCorrectionView";
import PercentCorrectorConfirmation from "./components/PercentCorrectorConfirmation";
import "./style.scss";

type Props = {
  percentEntity: PercentEntity;
  className?: string;
  onUpdatePercentCorrection?: (correctionData: CreateOrUpdateCorrectionData, id?: PercentEntity["id"]) => void;
  onDeletePercentCorrection?: (id: Correction["id"]) => void;
};

const computeSumFormPartIncome = (income: number, percent: number): number => {
  return Number(calculatePercentage(income, Number(percent)).toFixed(2));
};

export default function PercentCorrector({
  className,
  percentEntity: { id, partId, name, partIncome, percentFormIncome, corrections },
  onUpdatePercentCorrection,
  onDeletePercentCorrection,
}: Props) {
  const cls = ["percent-corrector flex-column"];
  if (className) cls.push(className);

  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const correction = useRef<Correction | undefined>();

  const hasCorrections = corrections.length > 0;

  const partTotal = computeSumFormPartIncome(partIncome, percentFormIncome);
  const correctionTotalAmount = corrections.reduce<number>((acc, c) => (acc += Number(c.amount)), 0);
  const balance = partTotal - correctionTotalAmount;

  const hasChanges = (checkingCorrection: Correction | CorrectionPure): boolean => {
    return (
      checkingCorrection.name !== correction.current?.name || checkingCorrection.amount !== correction.current?.amount
    );
  };

  const handleEditorAccept = (editedCorrection: EditedCorrection): void => {
    if (!guardOneOf<Correction>(editedCorrection, "id")) {
      onUpdatePercentCorrection &&
        onUpdatePercentCorrection({ ...editedCorrection, financialPartId: partId, type: name }, id);
    }

    if (guardOneOf<Correction>(editedCorrection, "id") && hasChanges(editedCorrection)) {
      onUpdatePercentCorrection && onUpdatePercentCorrection(editedCorrection, id);
    }

    correction.current = undefined;
    setIsEdit(false);
  };

  const handleEditorDecline = () => {
    correction.current = undefined;
    setIsEdit(false);
  };

  const handeCorrectionEdit = (id: Correction["id"]): void => {
    correction.current = corrections.find((c) => c.id === id);
    setIsEdit(true);
  };

  const deletingCorrectionId = useRef<Correction["id"] | null>(null);
  const handleCorrectionDelete = (id: Correction["id"]): void => {
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

  const titleWithPercent = `${PartName[name]}: ${percentFormIncome}%`;

  // todo: подумать как сделать что бы editor появлялся под редактируемым полем а не снизу.
  return (
    <div className={cls.join(" ")}>
      <span className="percent-corrector__title mb-4">
        {titleWithPercent}
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
