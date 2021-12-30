const NUMERIC_REGEXP = /^\d+$/;

export function isNumericOrVoid(value: string | number) {
  return typeof value === "number" || value === "" || NUMERIC_REGEXP.test(value);
}
