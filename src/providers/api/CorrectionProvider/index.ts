import Provider from "../Provider";
import { AxiosRequestConfig } from "axios";
import {Correction, CorrectionPure, InputCreateCorrection, InputSearchCorrection, InputUpdateCorrection} from "./types";

class CorrectionProvider extends Provider {
  override path = "/corrections";

  public async search(data: InputSearchCorrection, options?: AxiosRequestConfig): Promise<Correction[]> {
    this.path = this.path + "/search";
    const response = await super.abstractSearch<Correction[], InputSearchCorrection>(data, options);
    this.resetPath();
    return response;
  }

  public async create(data: InputCreateCorrection, options?: AxiosRequestConfig): Promise<Correction> {
    return await super.abstractPost<Correction, CorrectionPure>(data, options);
  }

  public async delete(id: Correction["id"], options?: AxiosRequestConfig): Promise<boolean> {
    return await super.abstractDelete(id, options);
  }

  public async update(data: InputUpdateCorrection, options?: AxiosRequestConfig): Promise<Correction> {
    return await super.abstractPut<Correction, InputUpdateCorrection>(data, options);
  }

  private resetPath(): void {
    this.path = "/corrections";
  }
}

export default new CorrectionProvider();
