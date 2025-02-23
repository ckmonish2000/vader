import { axiosInstance } from "./AxiosInstance";

export const getOutput = async (id: string) => {
  const response = await axiosInstance.get(`public-outputs/${id}`);
  return response.data;
};
