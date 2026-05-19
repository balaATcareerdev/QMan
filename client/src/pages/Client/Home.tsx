import {
  getActiveServices,
  getUpcomingServices,
  type ActiveService,
} from "@/auth/serviceApi";
import ServiceHeader from "@/component/Header/ServiceHeader";
import HeroSection from "@/component/Home/HeroSection";
import ServiceCard from "@/component/Home/ServiceCard";
import UpcomingService from "@/component/Home/UpcomingService";
import EditServiceModal from "@/component/Modals/EditServiceModal";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ActiveService | null>(
    null,
  );

  const { data: serviceData = [], isLoading: isActiveServiceLoading } =
    useQuery({
      queryKey: ["active_services"],
      queryFn: async () => {
        const response = await getActiveServices();
        if (response.success) {
          console.log(response.services);
        }
        return response.services;
      },
    });

  const {
    data: upcomingServiceData = [],
    isLoading: isUpcomingServiceLoading,
  } = useQuery({
    queryKey: ["upcoming_services"],
    queryFn: async () => {
      const response = await getUpcomingServices();
      if (response.success) {
        console.log(response.services);
      }
      return response.services;
    },
  });

  // const stats = useMemo(() => {
  //   const activeService = services.filter(
  //     (service) => service.status === "active",
  //   );

  //   const upcomingService = services.filter(
  //     (service) => service.status === "upcoming",
  //   );

  //   const upcomingSlotsPerService = upcomingService.map((service) => {
  //     const serviceSlots = slots.filter(
  //       (slot) => slot.serviceId === service.id,
  //     );

  //     return {
  //       serviceId: service.id,
  //       totalSlots: serviceSlots.length,
  //     };
  //   });

  //   const activeSlots: SlotType[] = slots.filter(
  //     (slot) => slot.status === "active",
  //   );

  //   const avgTime =
  //     activeSlots.length > 0
  //       ? activeSlots.reduce((acc, slot) => acc + slot.avgTime, 0) /
  //         activeSlots.length
  //       : 0;

  //   const avgTimePerService = activeService.map((service) => {
  //     const serviceSlots = activeSlots.filter(
  //       (slot) => slot.serviceId === service.id,
  //     );

  //     const avg =
  //       serviceSlots.length > 0
  //         ? serviceSlots.reduce((acc, slot) => acc + slot.avgTime, 0) /
  //           serviceSlots.length
  //         : 0;

  //     return {
  //       serviceId: service.id,
  //       Avg: Math.round(avg),
  //       totalSlots: serviceSlots.length,
  //     };
  //   });

  //   return {
  //     activeService,
  //     avgTime: Math.round(avgTime),
  //     activeSlots,
  //     avgTimePerService,
  //     upcomingService,
  //     upcomingSlotsPerService,
  //   };
  // }, [services, slots]);

  return (
    <div className="bg-[#01010f]  pt-30 min-h-screen">
      <HeroSection />

      <section className="px-20 pb-10">
        <ServiceHeader category="Active" />

        {isActiveServiceLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 size={40} color="white" className="animate-spin" />
          </div>
        ) : serviceData?.length > 0 ? (
          <div className="flex flex-col justify-center items-center gap-5 pt-5 px-10">
            {serviceData.map((ser, index) => (
              <ServiceCard key={index} service={ser} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-white">No Active services available.</p>
          </div>
        )}
      </section>

      <section className="px-20 pb-20">
        <ServiceHeader category="Upcoming" />

        {isUpcomingServiceLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 size={40} color="white" className="animate-spin" />
          </div>
        ) : upcomingServiceData.length > 0 ? (
          <div className="flex flex-col justify-center items-center gap-5 pt-5 px-10">
            {upcomingServiceData.map((ser) => (
              <UpcomingService
                key={ser.id}
                service={ser}
                setOpenEdit={setOpenEdit}
                setSelectedService={setSelectedService}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-white">No upcoming services available.</p>
          </div>
        )}
      </section>

      {openEdit && selectedService && (
        <EditServiceModal
          key={selectedService?.id}
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default Home;
