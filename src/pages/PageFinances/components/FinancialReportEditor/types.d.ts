import { FinancialReport } from "providers/api/FinancialReportProvider/types";

export type InputFinancialPeriod = keyof Pick<FinancialReport, "month" | "partCount">;
