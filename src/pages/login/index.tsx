// Core
import React, { useState } from "react";

// Libraries
import { notification } from 'antd';
import { useNavigate } from "react-router-dom";

// Components
import ModalCustom from "../../components/registerModal";

// Services
import { login } from "../../services/modules/auth";

// Styles
import {
  PageContainer,
  FormWrapper,
  InputField,
  OrangeSection,
  SignupLink,
  LogoWrapper,
  MainImageWrapper,
  TextOverlay
} from "./styles";
import { StyledButton } from "../../components/LoginButton/styles";

// Store
import { useAuthStore } from "../../store/authStore";

// Assets
import logo from "../../assets/logo.webp";
import man from "../../assets/man.png";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(formValues);
      setToken(data.token);

      notification.success({
        message: 'Login feito com sucesso',
        description: 'Seja bem vindo! Redirecionando para página de clientes...',
      });

      navigate("/customers");
    } catch (error) {

      notification.error({
        message: 'Falha ao realizar login',
        description: 'Email ou senha inválidos. Por favor tente novamente.',
      });
    }
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <PageContainer>
        <LogoWrapper>
          <img src={logo} alt="Logo" />
        </LogoWrapper>
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <InputField
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
              placeholder="Email"
            />

            <InputField
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              required
              placeholder="Password"
            />
            <StyledButton type="submit">Entrar</StyledButton>
          </form>
          <SignupLink>
            <span onClick={showModal}> Não possui uma conta? Cadastre-se</span>
          </SignupLink>
        </FormWrapper>
      </PageContainer>
      <MainImageWrapper>
        <img src={man} alt="Main Image" />
        <TextOverlay>
          Conecte-se aos maiores Bancos e Fintechs do País e oferte as melhores opções de crédito do mercado aos seus clientes!
        </TextOverlay>
      </MainImageWrapper>
      <OrangeSection />
      <ModalCustom isOpen={isModalOpen} onClose={handleCancel} />
    </>
  );
};

export default LoginPage;
