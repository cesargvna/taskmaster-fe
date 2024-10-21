import { FC, useRef } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./apps/Shared/Components/Navbar";

const RootContainer = styled.div`
  position: relative;
`;

const Main = styled.main`
  position: relative;
`;

type RootProps = object;

const Root: FC<RootProps> = () => {
  const navBarRef = useRef<HTMLElement | null>(null);

  return (
    <RootContainer>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
    </RootContainer>
  );
};

export default Root;
