import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveInLocalStorage } from "../../../utilities/local-storage-manager.tsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { login } from "../../../services/user.service.ts";
import { ButtonSuccess } from "../../Shared/Components/Buttons.ts";

type LoginProps = object;

interface Sesion {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

const Login: FC<LoginProps> = () => {
  const [errorAccount, setErrorAccount] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (values: Sesion) => {
    try {
      console.log(values);
      const userLogged = await login(values.email, values.password);
      saveInLocalStorage("token", userLogged.data.data?.token);
      values.email = "";
      console.log(userLogged.data);
      values.password = "";
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContainer>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        <FormContent>
          <Label>Email</Label>
          <Input type="email" name="email" />
          <ErrorValidation name="email" component="div" />
          <Label>Password</Label>
          <Input type="password" name="password" />
          <ErrorValidation name="password" component="div" />
          <ButtonSuccess type="submit">Login</ButtonSuccess>
        </FormContent>
      </Formik>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  background-image: radial-gradient(
    circle at bottom,
    rgba(0, 180, 255, 0.5),
    rgba(0, 0, 0, 1)
  );

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContent = styled(Form)`
  width: 400px;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Input = styled(Field)`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  font-size: 16px;
`;

const ErrorValidation = styled(ErrorMessage)`
  color: red;
  font-size: 16px;
`;
