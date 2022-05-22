import { KeysValuesType } from "types";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";

export type PercentEntity = {
  name: keyof Pick<FinancialPart, "common" | "piggyBank" | "free">;
  percentFormIncome: KeysValuesType<Pick<FinancialPart, "common" | "piggyBank" | "free">>;
  partIncome: number;
  corrections: object[];
};
