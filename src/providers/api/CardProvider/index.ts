import { Card, UpdateCardDataInput, CreateCardDataInput, CardProviderInterface } from "./CardProvider";
import api from "../../api";

class CardProvider implements CardProviderInterface {
  private readonly path = "/card";

  public async getAll(): Promise<Card[]> {
    const response = await api.get(this.path);
    return response.data;
  }

  public async create(data: CreateCardDataInput): Promise<Card> {
    const response = await api.post(this.path, data);
    return response.data;
  }

  public async update(urlId: string, data: UpdateCardDataInput): Promise<Card> {
    const response = await api.put(this.getUrlWithId(urlId), data);
    return response.data;
  }

  public async delete(id: string): Promise<boolean> {
    const response = await api.delete(this.getUrlWithId(id));
    return response.data;
  }

  private getUrlWithId(id: string): string {
    return `${this.path}/${id}`;
  }
}

export default new CardProvider();
