import { v1 as uuidv1 } from "uuid";
import Provider from "../Provider";
import {
  FinancialPercentCorrection,
  FinancialReport,
  InputFinancialPercentCorrection,
  InputFinancialReport
} from "./types";
import { AxiosRequestConfig } from "axios";
import { SearchData } from "../../types";

class FinancialReportProvider extends Provider {
  override readonly path = "/financial-report";

  public async getAll(options?: AxiosRequestConfig): Promise<FinancialReport[]> {
    return await super.abstractGetAll(options);
  }

  public async search(data: SearchData, options?: AxiosRequestConfig): Promise<FinancialReport | null> {
    const response = await super.abstractSearch<FinancialReport[], SearchData>(data, options);
    const result = response.filter((r) => data.ids.find((i) => i === r.id));
    if (result.length > 0) return result[0];
    return null;
  }

  public async create(data: InputFinancialReport, options?: AxiosRequestConfig): Promise<FinancialReport> {
    return await super.abstractPost<FinancialReport, InputFinancialReport>(data, options);
  }

  public async delete(id: string, options?: AxiosRequestConfig): Promise<boolean> {
    return await super.abstractDelete(id, options, true);
  }

  public async update(data: FinancialReport, options?: AxiosRequestConfig): Promise<FinancialReport> {
    return await super.abstractPut<FinancialReport, FinancialReport>(data, options);
  }

  public async updateCorrection(data: FinancialPercentCorrection): Promise<FinancialPercentCorrection> {
    return data;
  }

  public async deleteCorrection(id: FinancialPercentCorrection["id"]): Promise<boolean> {
    return true;
  }

  public async createCorrection(data: InputFinancialPercentCorrection): Promise<FinancialPercentCorrection> {
    return {
      ...data,
      id: uuidv1(),
    };
  }
}

export default new FinancialReportProvider();
