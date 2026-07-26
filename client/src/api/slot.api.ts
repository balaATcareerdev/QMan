import { api } from "@/api/axios";

type SlotPeekType = {
  id: string;
  slotName: string;
  serviceName: string;
  serviceDescription: string;
  startTime: string;
  scheduledDate: string;
  bookedCount: number;
};

export const getAllActiveSlotsQuick = async (): Promise<SlotPeekType[]> => {
  const response = await api.get("/slot/upcoming-peak");
  return response.data.slots;
};
