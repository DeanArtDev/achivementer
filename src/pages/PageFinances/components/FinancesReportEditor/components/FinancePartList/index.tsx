import React, { useEffect, useState } from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { Predicate, ToMap } from "type";
import { pickBy } from "lodash-es";
import { Period } from "consts";
import FieldsetPart from "./components/FieldsetPart";

import "./style.scss";

type Props = {
  className?: string;
  parts: FinancialPart[];
  onChangePart: (part: FinancialPart) => void;
  setValidationCallbacks: (predicatesMap: ToMap<Predicate>) => void;
};

export default function FinancePartList({ className, parts, onChangePart, setValidationCallbacks }: Props) {
  const cls = ["finance-part-list"];
  if (className) cls.push(className);

  const filterUnusedPredicates = (state: ToMap<Predicate>): ToMap<Predicate> => {
    return pickBy(state, (_, predicateName) => {
      return parts.some((p) => predicateName.includes(p.id));
    });
  };

  const [validationCallbacksMap, setValidationCallbacksMap] = useState<ToMap<Predicate>>({});
  const handleValidationCallback = (predicate: Predicate): void => {
    setValidationCallbacksMap((state) => {
      const updatedState = { ...state, [predicate.name]: predicate };
      return filterUnusedPredicates(updatedState);
    });
  };

  useEffect(() => {
    setValidationCallbacks(validationCallbacksMap);
  }, [validationCallbacksMap]);

  useEffect(() => {
    setValidationCallbacksMap((state) => filterUnusedPredicates(state));
  }, [parts]);

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
          setValidationCallback={handleValidationCallback}
        />
      ))}
    </ul>
  );
}
