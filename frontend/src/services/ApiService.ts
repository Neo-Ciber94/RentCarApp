import { webClient } from "./http";

type Create<T> = Partial<Omit<T, "id">>;

/**
 * A RestAPI client.
 */
export class ApiService<T, C = Create<T>> {
  constructor(protected readonly baseUrl: string) {}

  async getAll(): Promise<T[]> {
    return webClient.get<T[]>(this.baseUrl);
  }

  async get(id: number): Promise<T> {
    return webClient.get<T>(`${this.baseUrl}/${id}`);
  }

  async create(entity: C): Promise<T> {
    return webClient.post<T, C>(this.baseUrl, entity);
  }

  async update(entity: Partial<T>): Promise<T> {
    return webClient.put<T, Partial<T>>(this.baseUrl, entity);
  }

  async delete(id: number): Promise<T> {
    return webClient.delete<T>(`${this.baseUrl}/${id}`);
  }
}
