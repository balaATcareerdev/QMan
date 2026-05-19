import { api } from "@/api/axios";

interface ServiceType {
  serviceName: string;
  description: string;
  date: string;
}

export interface ActiveService {
  id: string;
  serviceName: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  isPaused: boolean;
  activeSlots: number;
  avgSecPerPerson: number;
  totalSlots: number;
}

export interface ResponseService {
  id: string;
  serviceName: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  isPaused: boolean;
}

interface GetActiveServicesResponse {
  success: boolean;
  message: string;
  services: ActiveService[];
}

interface ServiceStatsResponse {
  success: boolean;
  message: string;
  stats: {
    activeService: number;
    avgTime: number;
    availableSlots: number;
  };
}

export const createService = async (data: ServiceType) => {
  const response = await api.post("/service/create", data);
  return response.data;
};

export const getActiveServices = async () => {
  const response = await api.get<GetActiveServicesResponse>("/service/active");
  return response.data;
};

export const getServiceStats = async () => {
  const response = await api.get<ServiceStatsResponse>("/service/stats");
  return response.data;
};

export const getUpcomingServices = async () => {
  const response =
    await api.get<GetActiveServicesResponse>("/service/upcoming");
  return response.data;
};

export const startService = async (serviceId: string) => {
  const response = await api.post(`/service/start/${serviceId}`);
  return response.data;
};
