import { Regexp } from "consts";

export function isNumericOrVoid(value: string | number) {
  return typeof value === "number" || value === "" || new RegExp(Regexp.NUMERIC).test(value);
}
