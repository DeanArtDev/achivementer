import Provider from "../Provider";
import { FinancialReport, InputFinancialReport } from "./types";
import { AxiosRequestConfig } from "axios";

class FinancialRequestProvider extends Provider {
  protected readonly path = "/financial-request";

  public async getAll(options?: AxiosRequestConfig): Promise<FinancialReport[]> {
    return await super.abstractGetAll(options);
  }

  public async create(data: InputFinancialReport, options?: AxiosRequestConfig): Promise<FinancialReport> {
    return await super.abstractCreate(data, options);
  }

  public async delete(id: string): Promise<boolean> {
    return await super.abstractDelete(id);
  }
}

export default new FinancialRequestProvider();
