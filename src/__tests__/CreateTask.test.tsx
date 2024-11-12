import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import CreateTask from "../apps/Main/pages/CreateTask";
import { createTask } from "../services/task.service";

// Mock de createTask
jest.mock("../../../services/task.service", () => ({
  createTask: jest.fn(),
}));

// Mock de toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("CreateTask Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the CreateTask form", () => {
    render(
      <MemoryRouter>
        <CreateTask />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha de Vencimiento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prioridad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoría/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Crear Tarea/i }),
    ).toBeInTheDocument();
  });

  test("displays validation errors on empty submit", async () => {
    render(
      <MemoryRouter>
        <CreateTask />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /Crear Tarea/i }));

    expect(await screen.findByText("Nombre es requerido")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "La descripción debe tener al menos 10 caracteres",
      ),
    ).toBeInTheDocument();
  });

  test("submits form successfully when valid data is entered", async () => {
    (createTask as jest.Mock).mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter>
        <CreateTask />
      </MemoryRouter>,
    );

    // Simulación de ingreso de datos en el formulario
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Nueva tarea" },
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "Descripción válida de la tarea" },
    });
    fireEvent.change(screen.getByLabelText(/Fecha de Vencimiento/i), {
      target: { value: "2024-12-31" },
    });
    fireEvent.change(screen.getByLabelText(/Prioridad/i), {
      target: { value: "medium" },
    });
    fireEvent.change(screen.getByLabelText(/Estado/i), {
      target: { value: "pending" },
    });
    fireEvent.change(screen.getByLabelText(/Categoría/i), {
      target: { value: "personal" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Crear Tarea/i }));

    await waitFor(() =>
      expect(createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Nueva tarea",
          description: "Descripción válida de la tarea",
          fechaVencimiento: "2024-12-31",
          priority: "medium",
          status: "pending",
          category: "personal",
        }),
      ),
    );

    expect(toast.success).toHaveBeenCalledWith("Tarea creada con éxito");
  });

  test("shows error notification on form submission failure", async () => {
    (createTask as jest.Mock).mockRejectedValue(
      new Error("Error al crear la tarea"),
    );

    render(
      <MemoryRouter>
        <CreateTask />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Nueva tarea" },
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "Descripción válida de la tarea" },
    });
    fireEvent.change(screen.getByLabelText(/Fecha de Vencimiento/i), {
      target: { value: "2024-12-31" },
    });
    fireEvent.change(screen.getByLabelText(/Prioridad/i), {
      target: { value: "medium" },
    });
    fireEvent.change(screen.getByLabelText(/Estado/i), {
      target: { value: "pending" },
    });
    fireEvent.change(screen.getByLabelText(/Categoría/i), {
      target: { value: "personal" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Crear Tarea/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Error al crear la tarea"),
    );
  });
});
