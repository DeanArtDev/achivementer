export const numericToStringAdapter = (num: number): string => {
  return num === 0 ? "" : String(num);
};
