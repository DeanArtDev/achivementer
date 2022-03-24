import { useMemo } from "react";
import { BaseOption } from "type";
import { Month } from "consts";
import { PARTS_LIMIT } from "../../consts";

type FieldsetPeriodController = [BaseOption[], BaseOption[]];

export default function useController(): FieldsetPeriodController {
  const periodOptions = useMemo(() => {
    return Object.values(Month).reduce<BaseOption[]>((acc, i) => {
      if (typeof i === "number") {
        acc.push({ value: String(i), text: Month[i] });
      }
      return acc;
    }, []);
  }, []);

  //todo: переписаь на reduce 1 проходка
  const partOptions = new Array(PARTS_LIMIT)
    .fill("")
    .map<BaseOption>((_, i) => ({ value: String(i), text: String(i) }));

  return [periodOptions, partOptions];
}
