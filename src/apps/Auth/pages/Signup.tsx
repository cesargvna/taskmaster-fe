import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { User } from "../../../models";
import { register } from "../../../services/user.service";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre es requerido"),
  email: Yup.string().email("Email inválido").required("Email es requerido"),
  phone: Yup.string()
    .min(10, "El número de teléfono debe tener al menos 10 dígitos")
    .required("Teléfono es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñes no coinciden")
    .required("Confirmar contraseña es requerido"),
});

type FormValues = object;
const SignUp: FC<FormValues> = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values: User) => {
    try {
      const res = await register(values);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      navigate("/login");
    } catch (error) {
      toast.error("Error al registrar el usuario");
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {() => (
        <FormContainer>
          <FormContent>
            <FormElements>
              <Title>Registro</Title>
              <Form>
                <FormField>
                  <Label htmlFor="name">Nombre</Label>
                  <Input type="text" id="name" name="name" />
                  <ErrorMessage name="name" component={ErrorText} />
                </FormField>

                <FormField>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" name="email" />
                  <ErrorMessage name="email" component={ErrorText} />
                </FormField>

                <FormField>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input type="text" id="phone" name="phone" />
                  <ErrorMessage name="phone" component={ErrorText} />
                </FormField>

                <FormField>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input type="password" id="password" name="password" />
                  <ErrorMessage name="password" component={ErrorText} />
                </FormField>

                <FormField>
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <ErrorMessage name="confirmPassword" component={ErrorText} />
                </FormField>

                <SubmitButton type="submit">Registrar</SubmitButton>
              </Form>
            </FormElements>
          </FormContent>
        </FormContainer>
      )}
    </Formik>
  );
};

export default SignUp;

const FormContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContent = styled.div`
  width: 500px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  overflow: hidden; /* Oculta el desbordamiento */
`;

const FormElements = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  font-weight: bold;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.4rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  min-height: 1.25rem; /* Ajusta este valor según sea necesario */
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
