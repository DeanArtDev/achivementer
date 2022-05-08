import React, { useEffect, useRef } from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { Period } from "consts";
import { PartListValidateResultMap } from "../../types";
import { ValidatingPartListMap, ValidatingPartMap } from "../../../../types";
import FieldsetPart from "./components/FieldsetPart";
import "./style.scss";

type Props = {
  className?: string;
  parts: FinancialPart[];
  partListValidateResultMap: PartListValidateResultMap;
  onChangePart: (part: FinancialPart) => void;
  getValidate?: (validatingPartListMap: ValidatingPartListMap) => void;
};

export default function FinancialFieldsetPartList({
  className,
  parts,
  partListValidateResultMap,
  onChangePart,
  getValidate,
}: Props) {
  const cls = ["finance-part-list"];
  if (className) cls.push(className);

  const validatingPartListMap = useRef<ValidatingPartListMap>({});
  const handlePartValidateGet = (id: FinancialPart["id"], map: ValidatingPartMap): void => {
    validatingPartListMap.current = { ...validatingPartListMap.current, [id]: map };
  };

  useEffect(() => {
    validatingPartListMap.current = parts.reduce<ValidatingPartListMap>((acc, part) => {
      if (validatingPartListMap.current[part.id]) acc[part.id] = validatingPartListMap.current[part.id];
      return acc;
    }, {});
    getValidate && getValidate(validatingPartListMap.current);
  }, [parts.length]);

  //todo: обернуть в мемо?
  return (
    <ul className={cls.join(" ")}>
      {parts.map((part, index) => (
        <FieldsetPart
          title={`${Period[index]} part`}
          part={part}
          key={part.id}
          partValidateResultMap={partListValidateResultMap[part.id]}
          tagName={"li"}
          onChangePart={onChangePart}
          getValidate={(cb) => handlePartValidateGet(part.id, cb)}
        />
      ))}
    </ul>
  );
}
