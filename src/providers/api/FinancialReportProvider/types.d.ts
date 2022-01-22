import { ExtractKeysOfValueType, UnicId } from "type";

export type FinancialPart = {
  id: UnicId;
  income: number;
  common: number;
  piggyBank: number;
  free: number;
};

export type FinancialReport = {
  id: UnicId;
  period: FinancialPeriod;
  parts: FinancialPart[];
};

export type FinancialPeriod = {
  month: number;
  partCount: number;
};

export type FinancialPercentsValue = ExtractKeysOfValueType<FinancialPart>;

export type FinancialPeriodValue = ExtractKeysOfValueType<FinancialPeriod>;

export type InputFinancialReport = Omit<FinancialReport, "id">;

export interface FinancialReportFormData extends InputFinancialReport {
  parts: FinancialPart[];
}
