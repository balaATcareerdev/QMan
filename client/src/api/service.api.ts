import { api } from "@/api/axios";

type ServiceDetailsType = {
  id: string;
  serviceName: string;
  description: string;
  date: string;
  slots: SlotDetailsType[];
};

type SlotDetailsType = {
  slotName: string;
  startTime: string;
  endTime: string;
};

export const getServiceStats = async () => {
  const response = await api.get("/service/stats");
  return response.data.stats;
};

export const getActiveServices = async (): Promise<ServiceDetailsType[]> => {
  const response = await api.get("/service/active");
  return response.data.services;
};

export const getUpcomingServices = async (): Promise<ServiceDetailsType[]> => {
  const response = await api.get("/service/upcoming");
  return response.data.services;
};

export const startService = async (serviceId: string) => {
  const response = await api.post(`/service/activate/${serviceId}`);
  return response.data;
};
