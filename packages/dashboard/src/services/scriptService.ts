import { axiosInstance } from "./AxiosInstance";
import { Script } from "../types/Script";

export const getScripts = async (): Promise<Script[]> => {
  const response = await axiosInstance.get<Script[]>("/scripts");
  return response.data;
};

export const getScript = async (scriptID: string): Promise<Script> => {
  const response = await axiosInstance.get<Script>(`/scripts/${scriptID}`);
  return response.data;
};

export const createScript = async (scriptName: string) => {
  await axiosInstance.post<Script>("/scripts", {
    name: scriptName,
    commands: [],
  });
};

type UpdateScriptCommand = {
  id: string;
  args: string;
};

export const updateScript = async (
  scriptID: string,
  commands: UpdateScriptCommand[]
) => {
  await axiosInstance.patch<Script>(`/scripts/${scriptID}`, {
    commands: commands,
  });
};
