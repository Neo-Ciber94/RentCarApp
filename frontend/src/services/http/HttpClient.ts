/**
 * Base http client for requests.
 */
export interface HttpClient {
  get<T>(url: string, config?: object): Promise<T>;
  post<T, TData = T>(url: string, data?: TData, config?: object): Promise<T>;
  put<T, TData = T>(url: string, data?: TData, config?: object): Promise<T>;
  delete<T>(url: string, config?: object): Promise<T>;
}
