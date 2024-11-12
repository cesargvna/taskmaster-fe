import { FC, ComponentPropsWithoutRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar.tsx";
import { User } from "../../../models/index.ts";
import { getUserByToken } from "../../../services/user.service.ts";

type NavbarProps = object & ComponentPropsWithoutRef<"header">;

const NavBar: FC<NavbarProps> = () => {
  const navigate = useNavigate();

  const [openAvatar, setOpenAvatar] = useState<boolean>(false);
  const [profile, setProfile] = useState<User | null>(null);

  const handleRedirect = (path: string) => {
    navigate(`${path}`, { replace: true });
    setOpenAvatar(!openAvatar);
  };

  const getApiData = async () => {
    try {
      const { data } = await getUserByToken();
      data.data && setProfile(data.data);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);

  return (
    <Header>
      <HeaderContent>
        <LogoContainer>
          <Logo
            src="/logo.jpeg"
            alt="logo"
            onClick={() => navigate("/protected/dashboard")}
          />
        </LogoContainer>
        <Profile>
          <AvatarWrapper>
            <Avatar
              name={profile?.name}
              imageUrl={profile?.image}
              handleClick={() => setOpenAvatar(!openAvatar)}
            />
            <DropdownMenu open={openAvatar}>
              <MenuItem onClick={() => handleRedirect("/protected/profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleRedirect("/protected/dashboard")}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => handleRedirect("/logout")}>
                Log Out
              </MenuItem>
            </DropdownMenu>
          </AvatarWrapper>
        </Profile>
      </HeaderContent>
    </Header>
  );
};

export default NavBar;

const Header = styled.header`
  position: fixed;
  width: 100vw;
  min-height: 60px;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
`;
const HeaderContent = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
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
};
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
  z-index: 100;
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

const LogoContainer = styled.div`
  width: 50px;
  height: 50px;
`;
const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;
