export const numericToStringAdapter = (num: number): string => {
  return num === 0 ? "" : String(num);
};

export const numericToZeroStringAdapter = (num: number): string => {
  return num < 10 ? `0${num}` : String(num);
};
