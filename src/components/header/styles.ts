// Core
import styled from "styled-components";

export const Logo = styled.img`
  width: 160px;
  height: 90px;
  position: absolute;
  margin-left: 100px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 590px) {
    display: none;
  }
`;

export const UserName = styled.span`
  color: black;
  margin-left: 10px;

  @media (max-width: 1000px) {
    display: none;
  }
`;
