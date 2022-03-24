import { ToOptionalID, UniqID } from "type";

export type FinancialPart = {
  id: UniqID;
  income: number;
  common: number;
  piggyBank: number;
  free: number;
};

export type FinancialReport = {
  id: UniqID;
  month: number;
  year: number;
  partCount: number;
  parts: FinancialPart[];
};

export type FinancialPeriodValue = FinancialReport["month"] | FinancialReport["year"];

export type InputFinancialReport = Omit<FinancialReport, "id" | "parts"> & {
  parts: ToOptionalID<FinancialPart>[];
};
