import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, setFieldValue } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { createTask } from "../../../services/task.service";
import { Task } from "../../../models";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre es requerido"),
  description: Yup.string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder los 500 caracteres"),
  fechaVencimiento: Yup.date().min(new Date(), "La fecha debe ser futura"),
  priority: Yup.string().oneOf(
    ["low", "medium", "high"],
    "Seleccione una prioridad válida",
  ),

  status: Yup.string().oneOf(
    ["pending", "in_progress", "completed"],
    "Seleccione un estado válido",
  ),
  category: Yup.string().oneOf(
    ["personal", "work", "student", "other"],
    "Seleccione un estado válido",
  ),
});

type TaskProps = object;
const CreateTask: FC<TaskProps> = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    description: "",
    fechaVencimiento: "",
    priority: "low",
    status: "pending",
    category: "personal",
  };

  const handleCreateTask = async (values: Task) => {
    const resetValues = {
      ...values,
      description: values.description ? values.description : null,
      fechaVencimiento: values.fechaVencimiento
        ? values.fechaVencimiento
        : null,
    };
    try {
      const { data } = await createTask(resetValues);
      if (data.success) {
        toast.success("Tarea creada con éxito");
        navigate("/protected/dashboard");
      }
    } catch (error) {
      toast.error("Error al crear la tarea");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleCreateTask}
    >
      {({ setFieldValue }) => (
        <FormContainer>
          <h2> Create Task</h2>

          <StyledForm>
            <FormField>
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" type="text" />
              <ErrorMessage name="name" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                name="description"
                as="textarea"
                rows="4"
              />
              <ErrorMessage name="description" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
              <Input
                id="fechaVencimiento"
                name="fechaVencimiento"
                type="date"
              />
              <ErrorMessage name="fechaVencimiento" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="priority">Prioridad</Label>
              <Select
                id="priority"
                name="priority"
                as="select"
                onChange={(e) => {
                  setFieldValue("priority", e.target.value);
                }}
              >
                <option value="">Selecciona una prioridad</option>
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </Select>
              <ErrorMessage name="priority" component={ErrorText} />
            </FormField>

            <FormField>
              <Label htmlFor="status">Estado</Label>
              <Select
                id="status"
                name="status"
                as="select"
                onChange={(e) => {
                  setFieldValue("status", e.target.value);
                }}
              >
                <option value="">Selecciona un estado</option>
                <option value="pending">Pendiente</option>
                <option value="in_progress">En Progreso</option>
                <option value="completed">Completada</option>
              </Select>
              <ErrorMessage name="status" component={ErrorText} />
            </FormField>
            <FormField>
              <Label htmlFor="category">Categoría</Label>
              <Select
                id="category"
                name="category"
                as="select"
                onChange={(e) => {
                  setFieldValue("category", e.target.value);
                }}
              >
                <option value="">Selecciona una categoría</option>
                <option value="work">Trabajo</option>
                <option value="personal">Personal</option>
                <option value="student">Estudio</option>
                <option value="other">Otro</option>
              </Select>
              <ErrorMessage name="category" component={ErrorText} />
            </FormField>

            <SubmitButton type="submit">Crear Tarea</SubmitButton>
          </StyledForm>
        </FormContainer>
      )}
    </Formik>
  );
};

export default CreateTask;

const FormContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 70px);
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  width: 500px;
  max-width: 600px;
  max-height: 80vh; /* Define un máximo para la altura */
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px; /* Ancho del scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0; /* Color del fondo del track */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00c4cc; /* Color de la barra */
    border-radius: 10px;
    border: 2px solid #e0e0e0; /* Espacio entre la barra y el track */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #009fa8; /* Color cuando se pasa el cursor por la barra */
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled(Field)`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled(Field)`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
