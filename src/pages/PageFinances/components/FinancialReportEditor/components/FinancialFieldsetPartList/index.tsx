import React, { useRef } from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import {ValidationFieldsMap} from "../../../../types";
import { Period } from "consts";
import FieldsetPart from "./components/FieldsetPart";
import "./style.scss";

type Props = {
  className?: string;
  parts: FinancialPart[];
  onChangePart: (part: FinancialPart) => void;
  onValidCheck?: (isValid: boolean) => void;
};

//todo: если после максимального колличества нажать не верный символ то прилетит false но не покрасит input
export default function FinancialFieldsetPartList({ className, parts, onChangePart, onValidCheck }: Props) {
  const cls = ["finance-part-list"];
  if (className) cls.push(className);

  const validationFieldsMap = useRef<ValidationFieldsMap>({});
  const handlePartValidCheck = (id: string, isValid: boolean): void => {
    validationFieldsMap.current[id] = isValid;
    onValidCheck && onValidCheck(Object.values(validationFieldsMap.current).every(Boolean));
  };

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
          onValidCheck={(v) => handlePartValidCheck(part.id, v)}
        />
      ))}
    </ul>
  );
}
