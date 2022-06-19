import api from "../../api";
import { AxiosRequestConfig } from "axios";
import { LoginData } from "types";
import { LocalStorageKey } from "consts";
import StorageManager from "utils/StorageManager";
import { merge } from "lodash-es";

// todo: зависимости добавлять через конструктор
export default abstract class Provider {
  // todo: логика с переопределниями и очистками this.path выглядит запутаной и переусложненной
  protected path = "";

  protected async abstractGetAll<T>(options?: AxiosRequestConfig, isPrivate?: boolean): Promise<T[]> {
    const response = await api.get<T[]>(this.path, this.shapeOptions(options, isPrivate));
    return response.data;
  }

  protected async abstractSearch<T, Data>(data: Data, options?: AxiosRequestConfig, isPrivate?: boolean): Promise<T> {
    const response = await api.post<T>(this.path, data, this.shapeOptions(options, isPrivate));
    return response.data;
  }

  protected async abstractPost<T, Data>(data: Data, options?: AxiosRequestConfig, isPrivate?: boolean): Promise<T> {
    const response = await api.post<T>(this.path, data, this.shapeOptions(options, isPrivate));
    return response.data;
  }

  protected async abstractPut<T, Data>(data: Data, options?: AxiosRequestConfig, isPrivate?: boolean): Promise<T> {
    const response = await api.put<T>(this.path, data, this.shapeOptions(options, isPrivate));
    return response.data;
  }

  protected async abstractDelete(id: string, options?: AxiosRequestConfig, isPrivate?: boolean): Promise<boolean> {
    const response = await api.delete<boolean>(this.getUrlWithId(id), this.shapeOptions(options, isPrivate));
    return response.data;
  }

  protected shapePath(pathPart: string): void {
    this.path = `${this.path}/${pathPart}`;
  }

  private getUrlWithId(id: string): string {
    return this.path + "/" + id;
  }

  private shapeOptions(options?: AxiosRequestConfig, isPrivate = true): AxiosRequestConfig {
    if (!options && !isPrivate) return {};
    if (options && !isPrivate) return options;
    return merge(options, { headers: this.addPrivateHeaders });
  }

  private get addPrivateHeaders(): { Authorization: string } {
    const loginData = StorageManager.getItem<LoginData>(LocalStorageKey.USER_LOGIN_DATA);
    // todo: [error exception] переписать через глобальный отлов ошибок
    if (!loginData) throw Error("There is no authorization token");
    return { Authorization: `Bearer ${loginData.token}` };
  }
}
