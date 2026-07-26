import HeroSection from "@/component/HomeComponents/HeroSection";
import Stats from "@/component/HomeComponents/Stats";
import CreateServiceModal from "@/component/Modals/CreateServiceModal";
import ActiveServiceSection from "@/component/HomeComponents/ActiveServiceSection";
import PeekIntoUpcomingSlots from "@/component/HomeComponents/PeekIntoUpcomingSlots";
import UpcomingServiceSection from "@/component/HomeComponents/UpcomingServiceSection";
import { useEffect, useState } from "react";
import { ModalContext } from "@/context/ModalContext";
import EditServiceModal from "@/component/Modals/EditServiceModal";

export type SelectedServiceType = {
  id: string;
  serviceName: string;
  serviceDescription: string;
  date: string;
};

const Home = () => {
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

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [selectedService, setSelectedService] =
    useState<SelectedServiceType | null>(null);

  useEffect(() => {
    console.log("Selected Service changed:", selectedService);
  }, [selectedService]);

  return (
    <div className="min-h-screen p-2">
      <HeroSection setOpenCreateModal={setOpenCreateModal} />
      <Stats />
      <ActiveServiceSection />

      <ModalContext.Provider
        value={{
          openEditModal,
          setOpenEditModal,
          selectedService,
          setSelectedService,
        }}
      >
        <UpcomingServiceSection />
      </ModalContext.Provider>

      <PeekIntoUpcomingSlots />
      <CreateServiceModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
      {selectedService && (
        <EditServiceModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default Home;
