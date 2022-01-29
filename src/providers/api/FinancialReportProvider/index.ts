import Provider from "../Provider";
import { FinancialPart, FinancialReport, InputFinancialReport } from "./types";
import { AxiosRequestConfig } from "axios";
import api from "../../api";

class FinancialReportProvider extends Provider {
  protected readonly path = "/financial-report";

  public async getAll(options?: AxiosRequestConfig): Promise<FinancialReport[]> {
    return await super.abstractGetAll(options);
  }

  public async create(data: InputFinancialReport, options?: AxiosRequestConfig): Promise<FinancialReport> {
    return await super.abstractCreate<FinancialReport, InputFinancialReport>(data, options);
  }

  public async delete(id: string): Promise<boolean> {
    return await super.abstractDelete(id);
  }

  public async createPart(id: string): Promise<FinancialPart> {
    return await api.post(`${this.path}/part`, id);
  }
}

export default new FinancialReportProvider();
