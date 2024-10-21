import { FC, ComponentPropsWithoutRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #333;
  border: 1px solid #000;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  margin: 10px;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

type NavbarProps = object & ComponentPropsWithoutRef<"header">;

const NavBar: FC<NavbarProps> = () => {
  const navigate = useNavigate();

  return (
    <Header>
      <Nav>
        <h1>Logo</h1>
        <List>
          <button>Projects</button>
        </List>
      </Nav>
      <Profile>
        <h1>Profile</h1>
      </Profile>
    </Header>
  );
};

export default NavBar;
