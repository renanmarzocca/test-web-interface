// Core
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #DADADA;
`;

export const FormWrapper = styled.div`
  width: 20%;
  padding: 40px;
  background-color: rgba(204, 204, 204, 0.14);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-left: auto;
  margin-right: 200px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.04);
  z-index: 1;

  @media (max-width: 1026px) {
    width: 32%;
    margin-right: 120px;

  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.27);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.17);
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #ff5733;
  }

  @media (max-width: 1026px) {
    width: 85%;
  }
`;

export const OrangeSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 65%;
  height: 100%;
  background: linear-gradient(90deg, rgba(199, 80, 0, 1) 27%, rgba(218, 218, 218, 1) 83%);
`;

export const SignupLink = styled.div`
  text-align: center;
  margin-top: 20px;
  color: rgb(252, 133, 73);
  cursor: pointer;
  font-family: 'Lexend', sans-serif;
`;

export const LogoWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  img {
    width: 400px;
    height: auto;
  }

  @media (max-width: 1026px) {
    img {
      width: 300px; /* Reduce size when less than 1026px */
    }
  }
`;

export const MainImageWrapper = styled.div`
  position: absolute;
  left: 20%;
  bottom: 10%;
  transform: translateX(-50%);
  z-index: 2;

  img {
    width: 450px;
    height: auto;
  }

  @media (max-width: 1026px) {
    img {
      display: none;
    }
  }
`;

export const TextOverlay = styled.div`
  position: absolute;
  bottom: 80px;
  left: 51%;
  transform: translateX(-50%);
  width: 500px;
  height: 500px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 30px;
  text-align: center;
  color: white;
  font-size: 22px;
  font-weight: lighter;
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Lexend', sans-serif;

  @media (max-width: 1026px) {
    display: none;
  }
`;
