// Core
import api from "../api";

interface RegisterUserData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterUserData) => {
  const response = await api.post("/users/register", data);
  return response.data;
};
