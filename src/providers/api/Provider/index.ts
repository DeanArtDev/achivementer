import api from "../../api";
import { AxiosRequestConfig } from "axios";

class Provider {
  protected path = "";

  protected async abstractGetAll<T>(option?: AxiosRequestConfig): Promise<T[]> {
    const response = await api.get<T[]>(this.path, option);
    return response.data;
  }

  protected async abstractCreate<T, U>(data: U, option?: AxiosRequestConfig): Promise<T> {
    const response = await api.post<T>(this.path, data, option);
    return response.data;
  }

  protected async abstractUpdate<T, U extends { id: string }>(data: U, option?: AxiosRequestConfig): Promise<T> {
    const response = await api.put<T>(this.getUrlWithId(data.id), data, option);
    return response.data;
  }

  protected async abstractDelete(id: string, option?: AxiosRequestConfig): Promise<boolean> {
    const response = await api.delete<boolean>(this.getUrlWithId(id), option);
    return response.data;
  }

  private getUrlWithId(id: string): string {
    return this.path + "/" + id;
  }
}

export default Provider;
