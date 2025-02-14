// Store
import { useAuthStore } from "../store/authStore";

export const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  return { Authorization: `Bearer ${token}` };
};
