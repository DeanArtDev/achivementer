import { useRef, useState } from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { ValidatingPartListMap } from "../../types";
import { PartListValidateResultMap, PartValidateResultMap } from "./types";

const shapePartsValidatingMap = (map: ValidatingPartListMap): PartListValidateResultMap => {
  const newMap: PartListValidateResultMap = {};
  for (const partId in map) {
    newMap[partId] = Object.entries(map[partId]).reduce((acc, [key, value]) => {
      if (value) acc[key as keyof Omit<FinancialPart, "id">] = value();
      return acc;
    }, {} as PartValidateResultMap);
  }
  return newMap;
};

export default function useFormValidate(): {
  setPartsValidation: (map: ValidatingPartListMap) => void;
  setPeriodValidation: (isValid: boolean) => void;
  partsValidatingResultMap: PartListValidateResultMap;
  validate: () => boolean;
} {
  const [partsValidatingResultMap, setPartsValidateMap] = useState<PartListValidateResultMap>({});

  const partValidateMap = useRef<ValidatingPartListMap>({});
  const validationPeriod = useRef<boolean>(false);

  const setPartsValidation = (map: ValidatingPartListMap): void => {
    partValidateMap.current = map;
  };

  // todo: заменить на ValidatingCallback and boolean returning (по аналогии с parts)
  const setPeriodValidation = (isValid: boolean): void => {
    validationPeriod.current = isValid;
  };

  const validate = (): boolean => {
    const map = shapePartsValidatingMap(partValidateMap.current);
    setPartsValidateMap(map);
    return Object.values(map).every((value) => {
      return Object.values(value).every(Boolean);
    });
  };

  return { setPartsValidation, setPeriodValidation, validate, partsValidatingResultMap };
}
