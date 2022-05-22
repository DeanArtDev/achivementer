export function isUndefined(value: string | number | boolean | undefined): value is undefined {
  return typeof value === "undefined";
}
