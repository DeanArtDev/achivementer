import api from "../../api";
import { AxiosRequestConfig } from "axios";
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
    const headers = isPrivate ? { headers: this.addPrivateHeaders } : {};
    return merge(options, headers);
  }

  private get addPrivateHeaders(): { Authorization: string } {
    const token = StorageManager.getItem(LocalStorageKey.TOKEN);
    if (!token) return { Authorization: "" };
    return { Authorization: `Bearer ${token}` };
  }
}
