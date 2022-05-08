import { useRef, useState } from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { ValidatingPartListMap, ValidationPeriodMap } from "../../types";
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
  setPeriodValidation: (map: ValidationPeriodMap) => void;
  partsValidatingResultMap: PartListValidateResultMap;
  validate: () => boolean;
} {
  const partValidateMap = useRef<ValidatingPartListMap>({});
  const setPartsValidation = (map: ValidatingPartListMap): void => {
    partValidateMap.current = map;
  };

  const validationPeriod = useRef<ValidationPeriodMap>({ month: undefined, partCount: undefined });
  const setPeriodValidation = (map: ValidationPeriodMap): void => {
    validationPeriod.current = map;
  };

  const [partsValidatingResultMap, setPartsValidateMap] = useState<PartListValidateResultMap>({});
  const validate = (): boolean => {
    const map = shapePartsValidatingMap(partValidateMap.current);
    setPartsValidateMap(map);
    const isPartsValid = Object.values(map).every((value) => Object.values(value).every(Boolean));
    const isPeriodValid = Object.values(validationPeriod.current).every((cb) => cb && cb());
    return isPartsValid && isPeriodValid;
  };

  return { setPartsValidation, setPeriodValidation, validate, partsValidatingResultMap };
}
