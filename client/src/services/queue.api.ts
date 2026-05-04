import { tokens } from "@/assets";
import type { TokenType } from "@/types/types";

const getQueueList = (slotId: string) => {
  let queueList: TokenType[] = [];

  queueList = tokens
    .filter((t) => t.slotId === slotId && t.status === "waiting")
    .sort((a, b) => {
      return a.createdAt.localeCompare(b.createdAt);
    });

  return queueList;
};

export const fetchQueueList = async (slotId: string) => {
  return getQueueList(slotId);
};
