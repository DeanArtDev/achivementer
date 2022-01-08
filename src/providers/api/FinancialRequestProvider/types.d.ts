import { ExtractKeysOfValueType } from "type";

export type FinancialPercents = {
  common: number;
  piggyBank: number;
  free: number;
};

export type FinancialReport = {
  id: string;
  period: FinancialPeriod;
  income: number;
  percents: FinancialPercents;
};

export type FinancialPeriod = {
  month: number;
  part: number;
};

export type FinancialPercentsValue = ExtractKeysOfValueType<FinancialPercents>;

export type FinancialPeriodValue = ExtractKeysOfValueType<FinancialPeriod>;

export type InputFinancialReport = Omit<FinancialReport, "id">;
