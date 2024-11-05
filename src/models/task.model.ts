export interface Task {
  id?: string;
  name: string;
  description?: string | null;
  fechaVencimiento?: string | null;
  status?: string | null;
  priority?: string | null;
  category?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type Order = {
  priority: string;
  category: string;
  fechaVencimiento: string;
};
