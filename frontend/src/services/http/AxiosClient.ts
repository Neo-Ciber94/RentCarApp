import { isResult, Result } from "@shared/result";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpClient } from "./HttpClient";

export class AxiosClient implements HttpClient {
  private client: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.client = axios.create(config);
  }

  static fromUrl(url: string): AxiosClient {
    return new AxiosClient({ baseURL: url });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const result = await this.client.get(url, config);

    if (isResult(result.data)) {
      return Result.from(result.data) as unknown as T;
    }

    return result.data;
  }

  async post<T, TData = T>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const result = await this.client.post(url, data, config);

    if (isResult(result.data)) {
      return Result.from(result.data) as unknown as T;
    }

    return result.data;
  }

  async put<T, TData = T>(
    url: string,
    data: TData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const result = await this.client.put(url, data, config);

    if (isResult(result.data)) {
      return Result.from(result.data) as unknown as T;
    }

    return result.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const result = await this.client.delete(url, config);

    if (isResult(result.data)) {
      return Result.from(result.data) as unknown as T;
    }

    return result.data;
  }
}
