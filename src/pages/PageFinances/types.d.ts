import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { InputFinancialPeriod } from "./components/FinancialReportEditor/types";

export type ValidationCallback = (value?: string) => boolean;

export type ValidationPeriodMap = Record<InputFinancialPeriod, ValidationCallback | undefined>;

export type ValidatingPartMap = Record<keyof Omit<FinancialPart, "id" | "corrections">, ValidationCallback | undefined>;

export type ValidatingPartListMap = Record<FinancialPart["id"], ValidatingPartMap>;
