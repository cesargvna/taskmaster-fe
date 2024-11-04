import axios, { AxiosRequestConfig } from "axios";
import { getInLocalStorage } from "../utilities/local-storage-manager";

export const AxiosInterceptor = () => {
  const updateHeader = (request: AxiosRequestConfig) => {
    const token = getInLocalStorage("token");

    const newHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    request.headers = newHeaders;
    return request;
  };

  axios.interceptors.request.use((request: any) => {
    if (request.url?.includes("assets")) return request;
    return updateHeader(request);
  });

  axios.interceptors.response.use((response: any) => {
    return response;
  }),
    (error: any) => {
      return Promise.reject(error);
    };
};
