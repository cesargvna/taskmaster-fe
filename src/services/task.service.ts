import axios from "axios";
import { Task, Order } from "../models/task.model.ts";
const baseUrl = "http://localhost:3000";
// const baseUrl = "";

export const getTasks = () => {
  return axios.get<any>(`${baseUrl}/task`);
};

export const createTask = (task: Task) => {
  return axios.post<any>(`${baseUrl}/task`, task);
};

export const deleteTask = (id: string) => {
  return axios.delete<any>(`${baseUrl}/task/${id}`);
};

export const updateTask = (id: string, task: Task) => {
  return axios.put<any>(`${baseUrl}/task/${id}`, task);
};

export const sortTasks = (order: Order) => {
  return axios.get<any>(`${baseUrl}/tasks/sort`, {
    params: order,
  });
};
