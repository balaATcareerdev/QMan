import { servicesData, slotsData, tokens } from "@/assets";

export type BookingType = {
  tokenId: string;
  slotId: string;
  slotName: string;
  startTime: string;
  endTime?: string;
  status: string;
  serviceName: string;
};

export type BookingsResponse = {
  active: BookingType[];
  upcoming: BookingType[];
  backlog: BookingType[];
  history: BookingType[];
};

const getUserBookings = () => {
  const result: BookingsResponse = {
    active: [],
    upcoming: [],
    backlog: [],
    history: [],
  };

  tokens.forEach((token) => {
    const slot = slotsData.find((slot) => slot.id === token.slotId);
    const service = servicesData.find(
      (service) => service.id === slot?.serviceId,
    );

    if (!slot) return;

    const booking: BookingType = {
      tokenId: token.id,
      slotId: token.slotId,
      slotName: slot.slotName,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: slot.status,
      serviceName: service ? service.name : "Unknown Service",
    };

    if (token.status === "in_progress") {
      result.active.push(booking);
      return;
    }

    if (token.status === "waiting") {
      result.upcoming.push(booking);
      return;
    }

    if (token.status === "completed") {
      result.history.push(booking);
      return;
    }

    if (token.status === "backlog") {
      result.backlog.push(booking);
      return;
    }
  });

  return result;
};

export const fetchUserBookings = async () => {
  //   await new Promise((res) => setTimeout(res, 2000));
  return getUserBookings();
};
