// Core
import React, { useState, useEffect, useRef } from "react";

// Libraries
import { notification } from 'antd';

// Services
import { registerUser } from "../../services/modules/users";

// Store
import { useAuthStore } from "../../store/authStore";

// Style
import { 
  ModalOverlay,
  ModalContent,
  InputField,
  SubmitButton,
  CloseButton,
  HeaderText
  } from './styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const ModalCustom = ({ isOpen, onClose }: ModalProps) => {
  const setToken = useAuthStore((state) => state.setToken);
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
  });

  const modalContentRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setFormValues({
      name: "",
      email: "",
      password: "",
    });
  };

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
      const data = await registerUser(formValues);
      setToken(data.token);
      console.log("Registration successful:", data);

      notification.success({
        message: 'Usuário cadastrado!',
        description: 'O usuário foi cadastrado com sucesso.',
      });

      onClose();
      resetForm();
    } catch (error) {
      console.error("Registration failed:", error);

      notification.error({
        message: 'Falha ao criar!',
        description: 'Houve um problema ao criar o usuário. Por favor tente novamente.',
      });

    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose();
      resetForm();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlay isVisible={isOpen}>
      <ModalContent ref={modalContentRef} isVisible={isOpen}>
        <HeaderText>Registrar</HeaderText>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
            placeholder="Nome"
          />
          <InputField
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
            placeholder="Email"
          />
          <InputField
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            required
            placeholder="Senha"
          />
          <SubmitButton type="submit">Adicionar Usuário</SubmitButton>
        </form>
        <CloseButton onClick={() => { onClose(); resetForm(); }}>X</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalCustom;