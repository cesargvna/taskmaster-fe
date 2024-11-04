import { FC, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./apps/Shared/Components/Navbar";
// import { getUserByToken } from "./services/api.service";
// import { User } from "./models";
import { getInLocalStorage } from "./utilities/local-storage-manager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RootContainer = styled.div`
  position: relative;
`;

const Main = styled.main`
  position: relative;
`;

type RootProps = object;

const Root: FC<RootProps> = () => {
  // const [user, setUser] = useState<User | null>(null);
  // const getUser = async () => {
  //   const { data } = await getUserByToken();
  //   data.data && setUser(data.data);
  // };
  const user = getInLocalStorage("token");
  if (!user) {
    console.log("no user");
    return <Navigate to="/login" replace />;
  }
  useEffect(() => {}, []);
  return (
    <RootContainer>
      <ToastContainer />
      <NavBar />
      <Main>
        <Outlet />
      </Main>
    </RootContainer>
  );
};

export default Root;
