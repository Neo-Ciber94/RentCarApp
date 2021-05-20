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

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config);
  }

  post<T, TData = T>(
    url: string,
    data: TData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.post(url, data, config);
  }

  put<T, TData = T>(
    url: string,
    data: TData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.post(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config);
  }
}
