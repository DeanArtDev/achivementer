import Provider from "../Provider";
import { FinancialReport, InputFinancialReport } from "./types";
import { AxiosRequestConfig } from "axios";

class FinancialReportProvider extends Provider {
  override readonly path = "/financial-report";

  public async getAll(options?: AxiosRequestConfig): Promise<FinancialReport[]> {
    return await super.abstractGetAll(options);
  }

  public async create(data: InputFinancialReport, options?: AxiosRequestConfig): Promise<FinancialReport> {
    return await super.abstractCreate<FinancialReport, InputFinancialReport>(data, options);
  }

  public async delete(id: string): Promise<boolean> {
    return await super.abstractDelete(id);
  }

  public async update(data: FinancialReport, options?: AxiosRequestConfig): Promise<FinancialReport> {
    return await super.abstractUpdate<FinancialReport, FinancialReport>(data, options);
  }
}

export default new FinancialReportProvider();
