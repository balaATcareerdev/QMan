export interface ServiceType {
  id: string;
  name: string;
  description: string;
  date: string;
  status: string;
  createdAt: string;
}

export interface SlotType {
  id: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  status: string;
  capacity: number;
  bookedCount: number;
  currentToken: number;
  avgTime: number;
  completedCount: number;
}
