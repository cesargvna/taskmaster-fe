import { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  background-color: #1a1a1a;
  width: 100%;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const LoginButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const RegisterButton = styled.button`
  background-color: #00bfff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

type NavbarProps = object;
const Navbar: FC<NavbarProps> = () => {
  return (
    <NavbarContainer>
      <Logo>Task Manager</Logo>
      <ButtonsContainer>
        <Link to="/login">
          <LoginButton>Iniciar sesión</LoginButton>
        </Link>
        <Link to="/signup">
          <RegisterButton>Registrarse</RegisterButton>
        </Link>
      </ButtonsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
