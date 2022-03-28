import api from "../../api";
import { AxiosRequestConfig } from "axios";
import { LoginData } from "types";
import { LocalStorageKey } from "consts";
import StorageManager from "utils/StorageManager";
import { merge } from "lodash-es";

export default abstract class Provider {
  protected path = "";

  protected async abstractGetAll<T>(options?: AxiosRequestConfig, isPrivate = false): Promise<T[]> {
    const response = await api.get<T[]>(this.path, this.shapeOptions(options, isPrivate));
    return response.data;
  }

  protected async abstractPost<T, U>(data: U, options?: AxiosRequestConfig, isPrivate = false): Promise<T> {
    const response = await api.post<T>(this.path, data, this.shapeOptions(options, isPrivate));
    return response.data;
  }

  protected async abstractPut<T, U>(data: U, options?: AxiosRequestConfig, isPrivate = false): Promise<T> {
    const response = await api.put<T>(this.path, data, this.shapeOptions(options, isPrivate));
    return response.data;
  }

  protected async abstractDelete(id: string, options?: AxiosRequestConfig, isPrivate = false): Promise<boolean> {
    const response = await api.delete<boolean>(this.getUrlWithId(id), this.shapeOptions(options, isPrivate));
    return response.data;
  }

  protected shapePath(pathPart: string): void {
    this.path = `${this.path}/${pathPart}`;
  }

  private getUrlWithId(id: string): string {
    return this.path + "/" + id;
  }

  private shapeOptions(options?: AxiosRequestConfig, isPrivate = false): AxiosRequestConfig {
    if (!options && !isPrivate) return {};
    if (options && !isPrivate) return options;
    return merge(options, { headers: this.addPrivateHeaders });
  }

  private get addPrivateHeaders(): { Authorization: string } {
    const loginData = StorageManager.getItem<LoginData>(LocalStorageKey.USER_LOGIN_DATA);
    if (!loginData) return { Authorization: "" };
    return { Authorization: `Bearer ${loginData.token}` };
  }
}
