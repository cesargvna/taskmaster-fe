import { FC } from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #1a1a1a;
  color: #fff;
  padding: 1rem;
  text-align: center;
`;
type FooterProps = object;
const Footer: FC<FooterProps> = () => {
  return (
    <FooterContainer>
      &copy; 2024 Task Master. Todos los derechos reservados.
    </FooterContainer>
  );
};

export default Footer;
