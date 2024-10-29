import styled from "styled-components";

export const ButtonSuccess = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const ButtonError = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const ButtonBlank = styled.button`
  all: unset;
  padding: none;
  margin: none;
  background-color: transparent;
  color: inherit;
  border: none;
  height: 40px;
`;
