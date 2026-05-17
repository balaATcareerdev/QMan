import { api } from "@/api/axios";

interface UserLoginData {
  email: string;
  password: string;
}

export const userLogin = async (data: UserLoginData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const userAuth = async () => {
  const response = await api.get("/auth/is-auth");
  return response.data.user;
};

export const userLogout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
