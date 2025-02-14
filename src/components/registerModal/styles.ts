import styled from "styled-components";

// Styled Components for Modal with prop handling
export const ModalOverlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1ms ease-in-out; /* Smooth fade-in/fade-out effect */
`;

export const ModalContent = styled.div<{ isVisible: boolean }>`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 30px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  position: relative;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? "scale(1)" : "scale(0.9)")}; /* Smooth scaling effect */
  transition: opacity 1ms ease-in-out, transform 1ms ease-in-out; /* Smooth transition for both opacity and scale */
`;

export const HeaderText = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color:rgb(255, 255, 255); /* Dark color for better contrast */
  margin-bottom: 20px; /* Space below the header */
`;

export const InputField = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
  padding: 10px 40px;
  margin-top: 20px;
  background-color: #ff5733;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #ff4500;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
  padding: 0;
  line-height: 1;
  font-weight: bold;
`;
