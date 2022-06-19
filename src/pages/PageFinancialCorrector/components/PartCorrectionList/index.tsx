import React, { Fragment } from "react";
import { Correction } from "providers/api/CorrectionProvider/types";
import { CorrectionPercents, CreateOrUpdateCorrectionData, PercentEntity } from "../../types";
import { Period } from "consts";
import { isUndefined } from "utils/predicats";
import PercentCorrector from "../PercentCorrector";
import "./style.scss";

type Props = {
  partCount?: Period;
  correctionPercents: CorrectionPercents;
  className?: string;
  onUpdatePercentCorrection?: (correctionData: CreateOrUpdateCorrectionData, id?: PercentEntity["id"]) => void;
  onDeletePercentCorrection?: (id: Correction["id"]) => void;
};

export default function PartCorrectionList({
  className,
  partCount,
  correctionPercents: { percentEntities },
  onUpdatePercentCorrection,
  onDeletePercentCorrection,
}: Props) {
  const cls = ["part-correction-list"];
  if (className) cls.push(className);

  const handlePercentCorrectionUpdate = (
    correctionData: CreateOrUpdateCorrectionData,
    id?: PercentEntity["id"]
  ): void => {
    onUpdatePercentCorrection && onUpdatePercentCorrection(correctionData, id);
  };

  const handlePercentCorrectionDelete = (id: Correction["id"]) => {
    onDeletePercentCorrection && onDeletePercentCorrection(id);
  };

  const total = percentEntities[0].partIncome;

  return (
    <Fragment>
      {!isUndefined(partCount) && (
        <h4 className={"part-correction-list__title"}>
          {`${Period[partCount]} part: `}
          <span className={"part-correction-list__total fw-normal"}>{total}</span>
        </h4>
      )}

      <ul className={cls.join(" ")}>
        {percentEntities &&
          percentEntities.map((p) => (
            <li className={"part-correction-list__item"} key={p.id}>
              <PercentCorrector
                percentEntity={p}
                onUpdatePercentCorrection={handlePercentCorrectionUpdate}
                onDeletePercentCorrection={handlePercentCorrectionDelete}
              />
            </li>
          ))}
      </ul>
    </Fragment>
  );
}
