import axios, { AxiosRequestConfig } from "axios";

export const AxiosInterceptor = () => {
  const updateHeader = (request: AxiosRequestConfig) => {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3NTFkNjJhLTJhZWQtNDEyNy05NTBiLWQ3MzY5MDc5ZGQyMSIsImVtYWlsIjoianVhbkBnbWFpbC5jb20iLCJpYXQiOjE3MzAxMTc0NjcsImV4cCI6MTczMDIwMzg2N30.rLmHi2zKRT7oQcfTxPBdm3rvj4TEx0qzKxCCCONyY6M";

    const newHeaders = {
      Authorization: token,
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
