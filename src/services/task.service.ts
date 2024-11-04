import axios from "axios";
import { ApiResponse } from "../models/index";
const baseUrl = "http://localhost:3000";

export const getTasks = () => {
  return axios.get<any>(`${baseUrl}/task`);
};

export const createTask = (task: any) => {
  return axios.post<any>(`${baseUrl}/task`, task);
};
