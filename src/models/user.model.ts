export interface User {
  id?: string;
  email: string;
  password: string | null;
  name: string;
  phone: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ApiResponse {
  status: boolean;
  message: string;
  data?: User;
}
