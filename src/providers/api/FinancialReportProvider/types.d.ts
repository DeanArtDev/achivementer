import { ToOptionalID, UniqID } from "types";
import { Correction } from "../CorrectionProvider/types";

export type FinancialPart = {
  id: UniqID;
  income: number;
  common: number;
  piggyBank: number;
  free: number;
  corrections: Correction[];
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
