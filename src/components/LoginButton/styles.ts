// Core
import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 200px;
  padding: 10px 20px;
  background-color:rgba(0, 0, 0, 0);
  border: 1px solid #FF5733;
  border-radius: 8px;
  color: white;  
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  text-align: center;
  
  &:hover {
    background-color: #FF4500;
    border-color: #FF4500;
  }
  
  &:focus {
    outline: none;
  }

  @media (max-width: 1026px) {
    width: 80%;
  }
`;