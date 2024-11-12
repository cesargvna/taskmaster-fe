import axios from "axios";
import { ApiResponse, User } from "../models/user.model.ts";
import { getInLocalStorage } from "../utilities/local-storage-manager.tsx";
const baseUrl = "http://localhost:3000";
// const baseUrl = "";

export const login = (email: string, password: string) => {
  return axios.post<any>(`${baseUrl}/auth/login`, { email, password });
};
export const getUser = (id: string) => {
  return axios.get<ApiResponse>(`${baseUrl}/user/${id}`);
};

export const getUserByToken = () => {
  return axios.get<ApiResponse>(`${baseUrl}/user`);
};

export const updateUser = (id: string, data: User): Promise<any> => {
  return axios.put<ApiResponse>(`${baseUrl}/user/${id}`, data);
};

export const updateImage = async (UserId: string, data: File): Promise<any> => {
  const formData = new FormData();
  formData.append("image", data);
  const token = getInLocalStorage("token");
  try {
    const response = await fetch(`${baseUrl}/user/${UserId}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la actualización: ${response.statusText}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error al actualizar la imagen del usuario:", error);
    throw error; // Re-lanzamos el error para que sea manejado por el llamado a esta función
  }
};

interface Email {
  email: string;
}
export const sendEmail = async (email: Email): Promise<any> => {
  return axios.post(`${baseUrl}/auth/email`, email);
};

export const resetPassword = async (
  password: string,
  token: string,
): Promise<any> => {
  return axios.post(`${baseUrl}/auth/reset`, { password, token });
};

export const register = async (user: User): Promise<any> => {
  return axios.post(`${baseUrl}/auth/signup`, user);
};
