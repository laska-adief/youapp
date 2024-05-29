import axios from "axios";
import { UserDto } from "../types/UserDto";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProfile = async (token: string) => {
  const { data } = await axios.get(baseURL + "api/getProfile", {
    headers: {
      "x-access-token": token,
    },
  });
  return data;
};

export const createProfile = async (profleData: UserDto, token: string) => {
  const { data } = await axios.post(baseURL + "api/createProfile", profleData, {
    headers: {
      "x-access-token": token,
    },
  });
  return data;
};

export const updateProfile = async (profileData: UserDto, token: string) => {
  const { data } = await axios.put(baseURL + "api/updateProfile", profileData, {
    headers: {
      "x-access-token": token,
    },
  });
  return data;
};
