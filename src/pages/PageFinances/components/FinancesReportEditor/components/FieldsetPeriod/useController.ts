import { useMemo } from "react";
import { BaseOption } from "type";
import { Month } from "consts";
import { PARTS_LIMIT } from "../../consts";

type FieldsetPeriodController = [BaseOption<Month>[], BaseOption<Month>[]];

export default function useController(): FieldsetPeriodController {
  const periodOptions = useMemo(() => {
    return Object.values(Month).reduce<BaseOption<Month>[]>((acc, i) => {
      if (typeof i === "number") acc.push({ value: i, text: Month[i] });
      return acc;
    }, []);
  }, [Month]);

  const partOptions = new Array(PARTS_LIMIT - 1)
    .fill("")
    .map<BaseOption<number>>((_, i) => ({ value: i + 1, text: String(i + 1) }));

  return [periodOptions, partOptions];
}
