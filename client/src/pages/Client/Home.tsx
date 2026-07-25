import HeroSection from "@/component/HomeComponents/HeroSection";
import Stats from "@/component/HomeComponents/Stats";
import CreateServiceModal from "@/component/Modals/CreateServiceModal";
import ActiveServiceSection from "@/component/HomeComponents/ActiveServiceSection";
import PeekIntoUpcomingSlots from "@/component/HomeComponents/PeekIntoUpcomingSlots";
import UpcomingServiceSection from "@/component/HomeComponents/UpcomingServiceSection";
import { useState } from "react";

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

  return (
    <div className="min-h-screen p-2">
      <HeroSection setOpenCreateModal={setOpenCreateModal} />
      <Stats />
      <ActiveServiceSection />
      <UpcomingServiceSection />
      <PeekIntoUpcomingSlots />
      <CreateServiceModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </div>
  );
};

export default Home;
