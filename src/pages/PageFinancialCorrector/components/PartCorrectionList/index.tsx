import React, { Fragment } from "react";
import { PercentEntity } from "../../types";
import { Period } from "consts";
import { isUndefined } from "utils/predicats";
import PercentCorrector from "../PercentCorrector";
import "./style.scss";

type Props = {
  partCount?: Period;
  percentEntity: PercentEntity[];
  className?: string;
};

export default function PartCorrectionList({ className, partCount, percentEntity }: Props) {
  const cls = ["part-correction-list"];
  if (className) cls.push(className);

  return (
    <Fragment>
      {!isUndefined(partCount) && (
        <h4 className={"part-correction-list__title"}>
          {`${Period[partCount]} part: `}
          <span className={"part-correction-list__total fw-normal"}>{percentEntity[0].partIncome}</span>
        </h4>
      )}

      <ul className={cls.join(" ")}>
        {percentEntity &&
          percentEntity.map((p) => (
            <li className={"part-correction-list__item"} key={p.name}>
              <PercentCorrector percentEntity={p} />
            </li>
          ))}
      </ul>
    </Fragment>
  );
}
