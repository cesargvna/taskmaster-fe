import axios from "axios";
import { ApiResponse, User } from "../models/user.model.ts";
const baseUrl = "http://localhost:3000";

export const getUser = (id: string) => {
  return axios.get<ApiResponse>(`${baseUrl}/user/${id}`);
};

export const updateUser = (id: string, data: User): Promise<any> => {
  return axios.put<ApiResponse>(`${baseUrl}/user/${id}`, data);
};

export const updateImage = async (UserId: string, data: File): Promise<any> => {
  console.log("data", data);
  const formData = new FormData();
  formData.append("image", data);
  try {
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1MGQ1NmNjLWYwOWEtNDNkYy1iOGYyLTU0OWZjYWJiZDU3YSIsImVtYWlsIjoianVhbkBnbWFpbC5jb20iLCJpYXQiOjE3MzAxMzgwNDMsImV4cCI6MTczMDIyNDQ0M30.ETHJyQilIfKvZdkNzWpMaDrRGxgf26hKmkxZ6YmnRV4";
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
