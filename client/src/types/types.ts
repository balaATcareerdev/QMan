export interface ServiceType {
  id: string;
  name: string;
  description: string;
  date: string;
  status: string;
  isFav: boolean;
  createdAt: string;
}

export interface SlotType {
  id: string;
  slotName: string;
  isPaused: boolean;
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

export interface TokenType {
  id: string;
  slotId: string;
  slotNumber: number;
  next: {
    nextId: string;
    slotNumber: number;
  } | null;
  status: string;
  createdAt: string;
  startedServiceTime: string | null;
  endServiceTime: string | null;
}

export interface PriceType {
  plan: string;
  price: number;
  tokens: number;
  description: string;
  CoreCapacity: string[];
  isPopular: boolean;
  isDisabled: boolean;
}
