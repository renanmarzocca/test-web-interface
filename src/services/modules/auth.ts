// Core
import api from "../api";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  name: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  const { token, name } = response.data;

  localStorage.setItem("userName", name);
  localStorage.setItem("token", token);

  return { token, name };
};
