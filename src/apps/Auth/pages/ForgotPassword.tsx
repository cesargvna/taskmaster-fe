import { FC, useState } from "react";
import styled from "styled-components";
import { ButtonSuccess } from "../../Shared/Components/Buttons.ts";
import { sendEmail } from "../../../services/user.service.ts";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type ForgotPasswordProps = object;
interface Email {
  email: string;
}
const ForgotPassword: FC<ForgotPasswordProps> = () => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (email: Email) => {
    try {
      const res = await sendEmail(email);
      console.log("error", res);
      setMessage({
        type: "success",
        message:
          "Se ha enviado un correo con las instrucciones para restablecer tu contraseña",
      });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      email.email = "";
    } catch (error) {
      setMessage({
        type: "error",
        message: "Error al enviar, verifica tu correo",
      });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      email.email = "";
    }
  };

  return (
    <ForgotPasswordContainer>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Campo obligatorio"),
        })}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <FormContent>
          <Title>Olvidaste tu contrasena?</Title>
          {message && (
            <Message success={message.type}>{message.message}</Message>
          )}
          <Input type="email" name="email" placeholder="Correo Electronico" />
          <MessageError name="email" component="div" />
          <ButtonSuccess type="submit">Enviar Instrucciones</ButtonSuccess>
        </FormContent>
      </Formik>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;

const ForgotPasswordContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const FormContent = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled(Field)`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const MessageError = styled(ErrorMessage)`
  color: red;
  font-size: 16px;
`;

const Message = styled.p<{ success?: string }>`
  color: ${({ success }) => (success === "success" ? "green" : "red")};
  margin-top: 10px;
  font-size: 14px;
`;
