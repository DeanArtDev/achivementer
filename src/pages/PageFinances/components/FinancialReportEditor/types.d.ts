import { FinancialPart, FinancialReport } from "providers/api/FinancialReportProvider/types";

export type InputFinancialPeriod = keyof Pick<FinancialReport, "month" | "partCount">;

export type ValidateResultMap<T = string> = Record<T, boolean>;

export type PartValidateResultMap = ValidateResultMap<keyof Omit<FinancialPart, "id">>;

export type PartListValidateResultMap = Record<FinancialPart["id"], PartValidateResultMap>;
