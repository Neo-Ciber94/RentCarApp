import { API_URL } from "../../config";
import { AxiosClient } from "./AxiosClient";

/**
 * Http client services for web requests.
 */
export const webClient = new AxiosClient({
  baseURL: API_URL,
  withCredentials: true,
});
