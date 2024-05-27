import axios from "axios";
import { RegisterDto } from "../types/RegisterDto";
import { LoginDto } from "../types/LoginDto";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const register = async (registerData: RegisterDto) => {
  const { data } = await api.post("api/register", registerData);
  return data;
};

export const login = async (loginData: LoginDto) => {
  const { data } = await api.post("api/login", loginData);
  return data;
};
