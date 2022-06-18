import Provider from "../Provider";
import { FinancialReport, InputFinancialReport } from "./types";
import { AxiosRequestConfig } from "axios";
import { SearchData } from "../../types";

class FinancialReportProvider extends Provider {
  override readonly path = "/financial-report";

  public async getAll(options?: AxiosRequestConfig): Promise<FinancialReport[]> {
    return await super.abstractGetAll(options);
  }

  // todo: добавить поиск по id на беке и заиспользовать
  public async search(data: SearchData, options?: AxiosRequestConfig): Promise<FinancialReport | null> {
    const response = await super.abstractGetAll<FinancialReport>(options);
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
}

export default new FinancialReportProvider();
