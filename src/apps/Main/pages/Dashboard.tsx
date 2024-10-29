import { FC } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type NavbarProps = object;

const Dashboard: FC<NavbarProps> = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
