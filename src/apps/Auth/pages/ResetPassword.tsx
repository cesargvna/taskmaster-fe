import { FC, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { ButtonSuccess } from "../../Shared/Components/Buttons";
import { resetPassword } from "../../../services/user.service";

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Campo obligatorio"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden")
    .required("Campo obligatorio"),
});

type ResetPasswordProps = object;
const ResetPassword: FC<ResetPasswordProps> = () => {
  const [errorAccount, setErrorAccount] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = async (values: string) => {
    try {
      const res = await resetPassword(values, "" + token);
      res.data.success && navigate("/login");
    } catch (error) {
      setErrorAccount(error.response.data.message);
      setTimeout(() => {
        setErrorAccount("");
      }, 3000);
    }
  };

  return (
    <ResetContainer>
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values) => {
          handleResetPassword(values.newPassword);
        }}
      >
        {() => (
          <FormContent>
            <Title>Restablecer Contraseña</Title>
            {errorAccount && <ErrorAccount>{errorAccount}</ErrorAccount>}
            <Label htmlFor="newPassword">Nueva Contraseña</Label>
            <Input type="password" id="newPassword" name="newPassword" />
            <ErrorValidation name="newPassword" component="div" />
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
            <ErrorValidation name="confirmPassword" component="div" />
            <ButtonSuccess type="submit">Restablecer Contraseña</ButtonSuccess>
          </FormContent>
        )}
      </Formik>
    </ResetContainer>
  );
};

export default ResetPassword;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
`;
const ResetContainer = styled.div`
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
  font-size: 16px;
  margin-bottom: 10px;
  color: #fff;
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

const ErrorAccount = styled.div`
  background-color: rgba(255, 234, 229, 0.5);
  color: rgb(151, 6, 6);
  font-size: 14px;
  border: 1px solid rgb(255, 205, 199);
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 5px;
`;
