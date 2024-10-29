import { FC } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type NavbarProps = object;

const Dashboard: FC<NavbarProps> = () => {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Dashboard</h2>
      </DashboardHeader>
      <TableContainer>
        <Column>
          <h2>Do</h2>
        </Column>
        <Column>Doing</Column>
        <Column>Done</Column>
      </TableContainer>

    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
   width:100vw;
`;

const DashboardHeader = styled.div`
   width: 100%;
`;

const TableContainer = styled.div`
  width:90%;
  margin:0 auto;
  display:flex;
  gap:20px;
`;

const Column = styled.div`
  flex:1;
`;
