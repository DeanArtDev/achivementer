import { ExtractKeysOfValueType, UniqID } from "type";

export type FinancialPart = {
  id: UniqID;
  income: number;
  common: number;
  piggyBank: number;
  free: number;
};

export type InputPart = Omit<FinancialPart, "id"> & Partial<Pick<FinancialPart, "id">>;

export type FinancialReport = {
  id: UniqID;
  period: FinancialPeriod;
  parts: FinancialPart[];
};

export type FinancialPeriod = {
  month: number;
  partCount: number;
};

export type FinancialPeriodValue = ExtractKeysOfValueType<FinancialPeriod>;

export type InputFinancialReport = {
  period: FinancialPeriod;
  parts: InputPart[];
};

export type FinancialReportFormData = InputFinancialReport & {
  parts: FinancialPart[];
}
