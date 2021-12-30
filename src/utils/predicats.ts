const NUMERIC_REGEXP = /^\d+$/;

export function isNumericStringOrVoid(value: string) {
  return NUMERIC_REGEXP.test(value) || value === "";
}