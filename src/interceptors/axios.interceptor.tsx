import axios, { AxiosRequestConfig } from "axios";

export const AxiosInterceptor = () => {
  const updateHeader = (request: AxiosRequestConfig) => {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2YTNiZWQ2LTBhYjEtNDlmNy05MzA3LTdmYjJlMGNkYmJhOCIsImVtYWlsIjoiZ2Fib0BnbWFpbC5jb20iLCJpYXQiOjE3MzAyMzIwNzUsImV4cCI6MTczMDMxODQ3NX0.ZJcalOtmEjCVEuE-ucUO5OZ-EDMg-djGSrY6fvPXsPQ";

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
