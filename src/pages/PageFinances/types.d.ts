import { FinancialPart } from "../../providers/api/FinancialReportProvider/types";

export type ValidationFieldsMap = Record<string, boolean>;

export type ValidationCallback = (value?: string) => boolean;

export type ValidatingPartMap = Record<keyof Omit<FinancialPart, "id">, ValidationCallback | undefined>;

export type ValidatingPartListMap = Record<FinancialPart["id"], ValidatingPartMap>;
