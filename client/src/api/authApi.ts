import { api } from "@/api/axios";

interface UserLoginData {
  email: string;
  password: string;
}

interface userRegisterData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: "Customer" | "Client";
}

export const userLogin = async (data: UserLoginData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const userRegister = async (data: userRegisterData) => {
  const response = await api.post("/auth/register", data);
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
