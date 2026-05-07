import { servicesData, slotsData } from "@/assets";

const getServicesWithMeta = () => {
  return servicesData.map((service) => {
    const serviceSlots = slotsData.filter(
      (slot) => slot.serviceId === service.id,
    );

    const slotsLeft = serviceSlots.filter((s) => s.status === "active").length;

    const bookingsLeft = serviceSlots.reduce(
      (acc, slot) => acc + (slot.capacity - slot.bookedCount),
      0,
    );

    return {
      id: service.id,
      name: service.name,
      slotsLeft,
      bookingsLeft,
      createdAt: service.createdAt,
    };
  });
};

export const fetchServicesWithMeta = async () => {
  return getServicesWithMeta();
};

const getSlotsData = (serviceId: string) => {
  const result = slotsData.filter((slot) => slot.serviceId === serviceId);

  return result.length > 0 ? result : [];
};

export const fetchSlotsForService = async (serviceId: string) => {
  return getSlotsData(serviceId);
};
