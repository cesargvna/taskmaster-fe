import { FC, ComponentPropsWithoutRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar.tsx";

const Header = styled.header`
  position: fixed;
  width: 100vw;
  background-color: #333;
  border: 1px solid #000;
  z-index: 10;
  top: 0;
`;
const HeaderContent = styled.div`
  width:95%;
  heigth: 200px;
  margin: 0 auto;
  display:flex;
  justify-content: space-between;
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

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;
type DropProps = {
  open: boolean;
}
const DropdownMenu = styled.ul<DropProps>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${({ open }) => (open ? "block" : "none")};
  zin-index: 100;
`;

const MenuItem = styled.div`
  padding: 4px 10px;
  cursor: pointer;
  &:hover {
    background-color: #1868b8;
    border-radius: 4px;
    color: white;
  }
`;

type NavbarProps = object & ComponentPropsWithoutRef<"header">;

const NavBar: FC<NavbarProps> = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  const showLabels = () => {
    console.log("clicked")
  }

  return (
    <Header>
      <HeaderContent>
        <Nav>
          <p>Logo</p>
          <List>
            <button>Projects</button>
          </List>
        </Nav>
        <Profile>
          <Avatar handleClick={showLabels} />
        </Profile>
      </HeaderContent>
    </Header>
  );
};

export default NavBar;
