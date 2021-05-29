import { webClient } from "./http";

type Create<T> = Omit<T, "id">;

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

  async create(entity: Create<T>): Promise<T> {
    return webClient.post<T, Create<T>>(this.baseUrl, entity);
  }

  async update(entity: T): Promise<T> {
    return webClient.put<T>(this.baseUrl, entity);
  }

  async delete(id: number): Promise<T> {
    return webClient.delete<T>(this.baseUrl, { params: { id } });
  }
}
