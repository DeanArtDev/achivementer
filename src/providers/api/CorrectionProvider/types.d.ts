import { UniqID } from "types";
import { FinancialPart } from "../FinancialReportProvider/types";

export type Correction = {
  id: UniqID;
  name: string;
  amount: string;
};

export type InputSearchCorrection = {
  ids?: Correction["id"][];
  financialPartId?: FinancialPart["id"];
};

export type CorrectionPure = Omit<Correction, "id">;

export type InputCreateCorrection = Omit<Correction, "id"> & { financialPartId: FinancialPart["id"] };

export type InputUpdateCorrection = Correction;
