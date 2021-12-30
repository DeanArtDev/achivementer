import { ExtractKeysOfValueType } from "type";

export type FinancialPercents = {
  commonPercent: string;
  piggyBankPercent: string;
  freePercent: string;
};

export type FinancialReport = {
  period: FinancialPeriod
  income: string;
  percents: FinancialPercents;
};

export type FinancialPeriod = {
  month: string;
  part: string;
}

export type FinancialPercentsValue = ExtractKeysOfValueType<FinancialPercents>;
