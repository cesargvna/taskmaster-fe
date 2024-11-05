import React, { FC, MapHTMLAttributes } from "react";
import styled from "styled-components";
const baseUrl = import.meta.env.VITE_BACK_URL;

interface AvatarCircleProps {
  size?: number;
}

const AvatarCircle = styled.div<AvatarCircleProps>`
  width: ${({ size }) => `${size}px` || "40px"};
  height: ${({ size }) => `${size}px` || "40px"};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  font-size: "20px";
  color: #333;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    border-color: #ccc;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface AvatarProps {
  handleClick: (e: React.MauseEvent<HTMLElement>) => void;
  name?: string;
  imageUrl?: string;
  size?: number;
}

const Avatar: FC<AvatarProps> = ({
  handleClick,
  name = "cesar galindo",
  imageUrl,
  size = 35,
}) => {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0].toUpperCase()).join("");
    return initials;
  };

  return (
    <AvatarCircle onClick={handleClick} size={size}>
      {imageUrl ? (
        <AvatarImage src={baseUrl + imageUrl} alt={name} />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </AvatarCircle>
  );
};

export default Avatar;
