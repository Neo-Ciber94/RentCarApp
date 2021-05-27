import { webClient } from "./http";

/**
 * A RestAPI client.
 */
export class ApiService<T> {
  constructor(protected readonly baseUrl: string) {}

  async getAll(): Promise<T[]> {
    return webClient.get<T[]>(this.baseUrl);
  }

  async get(id: number): Promise<T> {
    return webClient.get<T>(this.baseUrl, { params: { id } });
  }

  async create(entity: T): Promise<T> {
    return webClient.post<T>(this.baseUrl, entity);
  }

  async update(entity: T): Promise<T> {
    return webClient.put<T>(this.baseUrl, entity);
  }

  async delete(id: number): Promise<T> {
    return webClient.delete<T>(this.baseUrl, { params: { id } });
  }
}
