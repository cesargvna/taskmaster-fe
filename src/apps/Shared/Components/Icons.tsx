import { FC } from "react";
import styled from "styled-components";

const ButtonIcon = styled.svg`
  width: 40px;
  height: 40px;
  cursor: pointer;

  &:hover {
    stroke: green;
  }
`;
const ButtonDanger = styled.svg`
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    stroke: red;
  }
`;

type IconsProps = {
  onClick?: () => void;
};

export const IconEdit: FC<IconsProps> = ({ onClick }) => {
  return (
    <ButtonIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <path d="M16 5l3 3" />
    </ButtonIcon>
  );
};

export const IconSave: FC<IconsProps> = () => {
  return (
    <ButtonIcon
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      type="submit"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
    </ButtonIcon>
  );
};

type IconDeleteProps = {
  onClick: (e: React.MouseEvent<SVGElement>) => void;
};
export const IconDelete: FC<IconDeleteProps> = ({ onClick }) => {
  return (
    <ButtonDanger
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </ButtonDanger>
  );
};
export const IconAdd: FC<IconsProps> = ({ onClick }) => {
  return (
    <ButtonIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      onClick={onClick}
    >
      <path d="M19 13h-6v6a1 1 0 01-2 0v-6H5a1 1 0 010-2h6V5a1 1 0 012 0v6h6a1 1 0 010 2z" />
    </ButtonIcon>
  );
};

export const IconSearch: FC<IconsProps> = ({ onClick }) => {
  return (
    <ButtonIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      onClick={onClick}
    >
      <path d="M21.71 20.29l-4.42-4.42A8 8 0 1016 17.34l4.42 4.42a1 1 0 001.42-1.42zM10 16a6 6 0 110-12 6 6 0 010 12z" />
    </ButtonIcon>
  );
};
