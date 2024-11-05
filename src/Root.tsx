import { FC, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./apps/Shared/Components/Navbar";
import { getInLocalStorage } from "./utilities/local-storage-manager";
const RootContainer = styled.div`
  position: relative;
`;

const Main = styled.main`
  position: relative;
`;

type RootProps = object;

const Root: FC<RootProps> = () => {
  const user = getInLocalStorage("token");
  if (!user) {
    console.log("no user");
    return <Navigate to="/login" replace />;
  }
  useEffect(() => {}, []);
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
