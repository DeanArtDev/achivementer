import { KeysValuesType, UniqID } from "types";
import { FinancialPart, FinancialReport } from "providers/api/FinancialReportProvider/types";
import { Correction, InputCreateCorrection, InputUpdateCorrection } from "../../providers/api/CorrectionProvider/types";

export type CorrectionPercents = {
  id: FinancialReport["id"];
  percentEntities: PercentEntity[];
};

export type PercentEntity = {
  id: UniqID;
  partId: FinancialPart["id"];
  name: keyof Pick<FinancialPart, "common" | "piggyBank" | "free">;
  percentFormIncome: KeysValuesType<Pick<FinancialPart, "common" | "piggyBank" | "free">>;
  partIncome: FinancialPart["income"];
  corrections: Correction[];
};

export type CreateOrUpdateCorrectionData = InputCreateCorrection | InputUpdateCorrection;
