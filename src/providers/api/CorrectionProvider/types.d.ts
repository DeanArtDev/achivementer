import { UniqID } from "types";
import { FinancialPart } from "../FinancialReportProvider/types";

export const enum CorrectionType {
  COMMON = "common",
  PIGGY_BANK = "piggyBank",
  FREE = "free",
}

export type Correction = {
  id: UniqID;
  name: string;
  amount: string;
  type: CorrectionType;
};

export type InputSearchCorrection = {
  ids?: Correction["id"][];
  financialPartId?: FinancialPart["id"];
};

export type CorrectionPure = Omit<Correction, "id">;

export type InputCreateCorrection = Omit<Correction, "id"> & { financialPartId: FinancialPart["id"] };

export type InputUpdateCorrection = Correction;
