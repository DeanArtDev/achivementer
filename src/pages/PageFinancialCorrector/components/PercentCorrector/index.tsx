import React, {useState} from "react";
import { PercentEntity } from "../../types";
import { calculatePercentage } from "utils/calculatePercentage";
import { PartName } from "./config";
import AddPercentCorrection from "./components/AddPercentCorrection";
import PercentCorrectionEditor from "./components/PercentCorrectionEditor";
import "./style.scss";

type Props = {
  percentEntity: PercentEntity;
  className?: string;
};

const computeSumFormPartIncome = (income: number, percent: number): number => {
  return Number(calculatePercentage(income, Number(percent)).toFixed(2));
};

export default function PercentCorrector({ className, percentEntity: { name, partIncome, percentFormIncome } }: Props) {
  const cls = ["percent-corrector"];
  if (className) cls.push(className);

  const [isEdit, setIsEdit] = useState(false);

  const handleEditorAccept = () => {};
  const handleEditorDecline = () => setIsEdit(false);

  return (
    <div className={cls.join(" ")}>
      <span className={"percent-corrector__title mb-4"}>
        {`${PartName[name]}: ${percentFormIncome}% `}
        <span className={"percent-corrector__total"}>{computeSumFormPartIncome(partIncome, percentFormIncome)}</span>
      </span>

      {isEdit && <PercentCorrectionEditor onDecline={handleEditorDecline} onAccept={handleEditorAccept} />}

      {!isEdit && <AddPercentCorrection onClick={() => setIsEdit(true)} />}
    </div>
  );
}
