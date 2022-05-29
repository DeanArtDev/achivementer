import { KeysValuesType, UniqID } from "types";
import {FinancialPart, FinancialPercentCorrection, FinancialReport} from "providers/api/FinancialReportProvider/types";

export type CorrectionPercents = {
  id: FinancialReport["id"],
  percentEntities: PercentEntity[],
}

export type PercentEntity = {
  id: UniqID;
  name: keyof Pick<FinancialPart, "common" | "piggyBank" | "free">;
  percentFormIncome: KeysValuesType<Pick<FinancialPart, "common" | "piggyBank" | "free">>;
  partIncome: FinancialPart["income"];
  corrections: FinancialPercentCorrection[];
};
