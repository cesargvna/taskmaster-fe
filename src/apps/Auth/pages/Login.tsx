import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [errorAccount, setErrorAccount] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (values: Sesion) => {
    try {
      const userLogged = await login(values.email, values.password);
      saveInLocalStorage("token", userLogged.data.data?.token);
      values.email = "";
      values.password = "";
      navigate("/protected/dashboard");
    } catch (error) {
      setErrorAccount("Email or password incorrect");
      setTimeout(() => {
        setErrorAccount("");
      }, 3000);
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
          <Title> Login</Title>

          {errorAccount && <ErrorAccount>{errorAccount}</ErrorAccount>}
          <Label>Email</Label>
          <Input type="email" name="email" />
          <ErrorValidation name="email" component="div" />
          <Label>Password</Label>
          <Input type="password" name="password" />
          <ErrorValidation name="password" component="div" />
          <ButtonSuccess type="submit">Login</ButtonSuccess>
          <Forgot>
            <Link to="/forgot-password">Forgot password?</Link>
          </Forgot>
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

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
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

const Forgot = styled.div`
  text-align: right;
  margin-top: 15px;
  font-size: 16px;

  a {
    color: #fff;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const ErrorAccount = styled.div`
  background-color: rgba(255, 234, 229, 0.5);
  color: rgb(151, 6, 6);
  font-size: 14px;
  border: 1px solid rgb(255, 205, 199);
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 5px;
`;
