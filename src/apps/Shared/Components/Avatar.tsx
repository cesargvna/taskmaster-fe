import { FC } from "react"
import styled from "styled-components";


interface AvatarCircleProps {
  size?: number;
}

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AvatarCircle = styled.div<AvatarCircleProps>`
  width: ${({ size }) => `${size}px` || "40px"};
  height: ${({ size }) => `${size}px` || "40px"};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  font-size: ${({ size }) => `${size && size / 2.5}px` || "16px"};
  color: #555;
`;

const UserName = styled.span`
  font-size: 16px;
  color: #333;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface AvatarProps {
  handleClick: () => void;
  name?: string;
  imageUrl?: string;
  size?: number;
}

const Avatar: FC<AvatarProps> = ({
  handleClick,
  name = "cesar galindo",
  imageUrl,
  size = 40,
}) => {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0].toUpperCase()).join("");
    return initials;
  };

  return (
    <AvatarCircle onClick={handleClick} size={size}>
      {imageUrl ? (
        <AvatarImage src={imageUrl} alt={name} />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </AvatarCircle>
  );
};

export default Avatar;