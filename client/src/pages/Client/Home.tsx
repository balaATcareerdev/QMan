import { servicesData, slotsData } from "@/assets";
import HeroSection from "@/component/Home/HeroSection";
import ServiceCard from "@/component/Home/ServiceCard";
import UpcomingService from "@/component/Home/UpcomingService";
import EditServiceModal from "@/component/Modals/EditServiceModal";
import CategoryHeader from "@/component/Title/CategoryHeader";
import type { ServiceType, SlotType } from "@/types/types";
import { useEffect, useMemo, useState } from "react";

const Home = () => {
  const [services, setServices] = useState<ServiceType[]>([]);

  const [slots, setSlots] = useState<SlotType[]>([]);

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    setServices(servicesData);
    setSlots(slotsData);
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const activeService = services.filter(
      (service) => service.status === "active",
    );

    const upcomingService = services.filter(
      (service) => service.status === "upcoming",
    );

    const upcomingSlotsPerService = upcomingService.map((service) => {
      const serviceSlots = slots.filter(
        (slot) => slot.serviceId === service.id,
      );

      return {
        serviceId: service.id,
        totalSlots: serviceSlots.length,
      };
    });

    const activeSlots: SlotType[] = slots.filter(
      (slot) => slot.status === "active",
    );

    const avgTime =
      activeSlots.length > 0
        ? activeSlots.reduce((acc, slot) => acc + slot.avgTime, 0) /
          activeSlots.length
        : 0;

    const avgTimePerService = activeService.map((service) => {
      const serviceSlots = activeSlots.filter(
        (slot) => slot.serviceId === service.id,
      );

      const avg =
        serviceSlots.length > 0
          ? serviceSlots.reduce((acc, slot) => acc + slot.avgTime, 0) /
            serviceSlots.length
          : 0;

      return {
        serviceId: service.id,
        Avg: Math.round(avg),
        totalSlots: serviceSlots.length,
      };
    });

    return {
      activeService,
      avgTime: Math.round(avgTime),
      activeSlots,
      avgTimePerService,
      upcomingService,
      upcomingSlotsPerService,
    };
  }, [services, slots]);

  return (
    <div className="bg-linear-to-b from-[#000000] to-[#140B1B]">
      <HeroSection
        activeService={stats.activeService.length}
        avgTime={stats.avgTime}
        availableSlots={stats.activeSlots.length}
        isLoading={isLoading}
      />

      {stats.activeService.length > 0 && (
        <section className="px-20">
          <CategoryHeader text={"Active"} />
          <hr className="mt-2 border-[#CC8CFC]" />

          <div className="flex flex-col justify-center items-center gap-20 pt-5">
            {stats.activeService.map((ser, index) => (
              <ServiceCard
                key={index}
                service={ser}
                avgTimePerService={
                  stats.avgTimePerService.find(
                    (s) => s.serviceId === ser.id,
                  ) || { serviceId: ser.id, Avg: 0, totalSlots: 0 }
                }
              />
            ))}
          </div>
        </section>
      )}

      {stats.upcomingSlotsPerService.length > 0 && (
        <section className="px-20 pb-20">
          <CategoryHeader text={"Upcoming"} />

          <hr className="mt-2 border-[#CC8CFC]" />

          <div className="flex flex-col justify-center items-center gap-20 pt-5">
            {stats.upcomingService.map((ser) => (
              <UpcomingService
                key={ser.id}
                service={ser}
                slotCount={
                  stats.upcomingSlotsPerService.find(
                    (s) => s.serviceId === ser.id,
                  ) || {
                    serviceId: ser.id,
                    totalSlots: 0,
                  }
                }
                setOpenEdit={setOpenEdit}
                setSelectedService={setSelectedService}
              />
            ))}
          </div>
        </section>
      )}

      {openEdit && selectedService && (
        <EditServiceModal
          key={selectedService?.id}
          open={openEdit}
          isOpen={setOpenEdit}
          onClose={() => setOpenEdit(false)}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default Home;
