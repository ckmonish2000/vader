import { axiosInstance } from "./AxiosInstance";
import { Script } from "../types/Script";

export const getScripts = async (): Promise<Script[]> => {
  const response = await axiosInstance.get<Script[]>("/scripts");
  return response.data;
};

export const createScript = async (scriptName: string) => {
  await axiosInstance.post<Script>("/scripts", {
    name: scriptName,
    commands: [],
  });
};
