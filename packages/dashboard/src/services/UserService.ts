import { User } from "@/types/User";
import { axiosInstance } from "./AxiosInstance";

export const me = async () => {
  const { data } = await axiosInstance.get("/user/me");
  return <User>data;
};

export const logout = async () => {
  await axiosInstance.get("/auth/logout");
  window.location.href = "/signin";
};
