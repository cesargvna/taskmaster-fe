import { FC } from "react";
import NavBarLanding from "../Components/NavBarLanding.tsx";
import Footer from "../Components/Footer.tsx";
import styled from "styled-components";

const LandingPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const LandingPageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const Image = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

type LandingPageProps = object;
const LandingPage: FC<LandingPageProps> = () => {
  return (
    <LandingPageContainer>
      <LandingPageContent>
        <NavBarLanding />
        <ImagesContainer>
          <Image src="imagen1.jpg" alt="Imagen 1" />
          <Image src="imagen2.jpg" alt="Imagen 2" />
          <Image src="imagen3.jpg" alt="Imagen 3" />
        </ImagesContainer>
        <Footer />
      </LandingPageContent>
    </LandingPageContainer>
  );
};

export default LandingPage;
