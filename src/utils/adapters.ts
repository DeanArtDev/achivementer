export const numericToStringAdapter = (value: number): string => {
  return value === 0 ? "" : String(value);
}