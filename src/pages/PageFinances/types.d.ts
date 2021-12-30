import { ExtractKeysOfValueType } from "type";

export type FinancialPercents = {
  commonPercent: number;
  piggyBankPercent: number;
  freePercent: number;
};

export type FinancialReport = {
  period: FinancialPeriod
  income: number;
  percents: FinancialPercents;
};

export type FinancialPeriod = {
  month: string;
  part: number;
}

export type FinancialPercentsValue = ExtractKeysOfValueType<FinancialPercents>;
export type FinancialPeriodValue = ExtractKeysOfValueType<FinancialPeriod>
