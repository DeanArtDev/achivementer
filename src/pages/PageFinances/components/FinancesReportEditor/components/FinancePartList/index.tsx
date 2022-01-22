import React from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { Predicate } from "type";
import { Period } from "consts";
import FieldsetPart from "./components/FieldsetPart";

import "./style.scss";

type Props = {
  className?: string;
  parts: FinancialPart[];
  onChangePart: (part: FinancialPart) => void;
  setValidationCallback: (predicate: Predicate) => void;
};

export default function FinancePartList({ className, parts, onChangePart, setValidationCallback }: Props) {
  const cls = ["finance-part-list"];
  if (className) cls.push(className);

  return (
    <ul className={cls.join(" ")}>
      {parts.map((part, index) => (
        <FieldsetPart
          title={`${Period[index]} part`}
          part={part}
          id={part.id}
          key={part.id}
          tagName={"li"}
          onChangePart={onChangePart}
          setValidationCallback={setValidationCallback}
        />
      ))}
    </ul>
  );
}
