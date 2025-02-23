import { Command } from "@/types/Script";
import { axiosInstance } from "./AxiosInstance";

export const getCommands = async (): Promise<Command[]> => {
  const response = await axiosInstance.get<Command[]>("/commands");
  return response.data;
};
