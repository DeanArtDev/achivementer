import Provider from "../Provider";
import { FinancialReport, InputFinancialReport } from "./types";
import { AxiosRequestConfig } from "axios";

class FinancialReportProvider extends Provider {
  override readonly path = "/financial-report";

  public async getAll(options?: AxiosRequestConfig): Promise<FinancialReport[]> {
    return await super.abstractGetAll(options, true);
  }

  public async create(data: InputFinancialReport, options?: AxiosRequestConfig): Promise<FinancialReport> {
    return await super.abstractPost<FinancialReport, InputFinancialReport>(data, options, true);
  }

  public async delete(id: string, options?: AxiosRequestConfig): Promise<boolean> {
    return await super.abstractDelete(id, options, true);
  }

  public async update(data: FinancialReport, options?: AxiosRequestConfig): Promise<FinancialReport> {
    return await super.abstractPut<FinancialReport, FinancialReport>(data, options, true);
  }
}

export default new FinancialReportProvider();
