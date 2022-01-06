import Provider from "../Provider";
import { FinancialReport, InputFinancialReport } from "./types";
import { AxiosRequestConfig } from "axios";

class FinancialRequestProvider extends Provider {
  protected readonly path = "/financial-request";

  public async getAllReports(options?: AxiosRequestConfig): Promise<FinancialReport[]> {
    return await super.abstractGetAll(options);
  }

  public async createReport(data: InputFinancialReport, options?: AxiosRequestConfig): Promise<FinancialReport> {
    return await super.abstractCreate(data, options);
  }
}

export default new FinancialRequestProvider();
