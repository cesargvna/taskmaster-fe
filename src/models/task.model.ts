export interface Task {
  id?: string;
  name: string;
  description?: string | null;
  fechaVencimiento?: string | null;
  status?: string | null;
  priority?: "low" | "medium" | "high";
  category?: "personal" | "student" | "trabajo" | "other";
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type Order = {
  priority: string;
  category: string;
  fechaVencimiento: string;
};
