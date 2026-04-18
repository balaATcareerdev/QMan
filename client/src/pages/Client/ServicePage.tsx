import { servicesData, slotsData, tokens } from "@/assets";
import HeroSection from "@/component/Service/HeroSection";
import SlotCard from "@/component/Service/SlotCard";
import UpcomingSlotCard from "@/component/Service/UpcomingSlotCard";
import CategoryHeader from "@/component/Title/CategoryHeader";
import type { ServiceType, SlotType, TokenType } from "@/types/types";
import {
  getFormattedTime,
  getProgressPercentage,
  getTimeDifference,
} from "@/util/slotUtils";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

const ServicePage = () => {
  const { serviceId } = useParams();

  const [service, setService] = useState<ServiceType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [slotsDetails, setSlotsDetails] = useState<SlotType[]>([]);

  const [tokenDetails, setTokenDetails] = useState<TokenType[]>([]);

  useEffect(() => {
    const serviceSelected = servicesData.find((s) => s.id === serviceId);
    const t1 = setTimeout(() => {
      setService(serviceSelected ?? null);
      setIsLoading(false);
    }, 2000);
    const t2 = setTimeout(() => setSlotsDetails(slotsData), 2000);
    const t3 = setTimeout(() => setTokenDetails(tokens), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [serviceId]);

  const statsData = useMemo(() => {
    const activeSlots = slotsDetails.filter(
      (s) => s.serviceId === serviceId && s.status === "active",
    );

    const upcomingSlots = slotsDetails.filter(
      (s) => s.serviceId === serviceId && s.status === "upcoming",
    );

    const pausedSlots = slotsDetails.filter(
      (s) => s.serviceId === serviceId && s.status === "paused",
    );

    const avgTime =
      activeSlots.length > 0
        ? activeSlots.reduce((acc, slot) => acc + slot.avgTime, 0) /
          activeSlots.length
        : 0;

    const queue = tokenDetails.filter(
      (t) =>
        t.status === "waiting" &&
        activeSlots.some((slot) => slot.id === t.slotId),
    );

    return {
      activeSlots,
      avgTime,
      totalSlots: activeSlots.length + upcomingSlots.length,
      queueLength: queue.length,
      upcomingSlots,
      pausedSlots,
    };
  }, [serviceId, slotsDetails, tokenDetails]);

  return (
    <div className="bg-linear-to-b from-[#14021E] to-[#14021E] min-h-screen">
      {isLoading ? (
        <div className="bg-linear-to-b from-[#14021E] to-[#14021E] flex justify-center items-center min-h-screen">
          <LoaderCircle size={40} color="white" className="animate-spin" />
        </div>
      ) : service ? (
        <>
          <HeroSection
            serviceName={service.name}
            activeSlots={statsData.activeSlots.length}
            avgTime={statsData.avgTime}
            total={statsData.totalSlots}
            queueLength={statsData.queueLength}
          />

          <section className="px-10">
            <h1 className="font-medium text-5xl text-[#A9A5AC]">SLOTS</h1>

            <CategoryHeader text={"Active"} />
            <hr className="border-[#DEB2FF] mt-5" />

            <div className="py-20">
              {statsData.activeSlots.length > 0 ? (
                <div className="flex flex-col justify-center items-center gap-10">
                  {statsData.activeSlots.map((slot) => (
                    <SlotCard
                      slotName={slot.slotName}
                      key={slot.id}
                      startingTime={getFormattedTime(slot.startTime)}
                      endingTime={getFormattedTime(slot.endTime)}
                      pendingTime={getTimeDifference(
                        new Date().toISOString(),
                        slot.endTime,
                      )}
                      totalBooked={slot.bookedCount}
                      servicing={slot.currentToken}
                      progress={getProgressPercentage(
                        slot.currentToken,
                        slot.bookedCount,
                      )}
                      isPaused={slot.isPaused}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex  text-rose-400 font-medium text-2xl  justify-center items-center gap-2 pt-10">
                  <p>No Active Slots</p>
                  <span className="w-2 h-2 bg-rose-400 animate-pulse [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-rose-400 animate-pulse [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-rose-400 animate-pulse [animation-delay:300ms]" />
                </div>
              )}
            </div>
          </section>

          <section className="px-10 pb-20">
            <CategoryHeader text={"Upcoming"} />
            <hr className="border-[#DEB2FF] mt-5" />

            {statsData.upcomingSlots.length > 0 ? (
              <div className="flex justify-center items-center gap-10 py-20">
                {statsData.upcomingSlots.map((slot) => (
                  <UpcomingSlotCard
                    key={slot.id}
                    slotName={slot.slotName}
                    startingTime={getFormattedTime(slot.startTime)}
                    pendingTime={getTimeDifference(
                      new Date().toISOString(),
                      slot.startTime,
                    )}
                    totalBooked={slot.bookedCount}
                    progress={getProgressPercentage(
                      slot.currentToken,
                      slot.bookedCount,
                    )}
                  />
                ))}
              </div>
            ) : (
              <div className="flex  text-rose-400 font-medium text-2xl  justify-center items-center gap-2 pt-10">
                <p>No Upcoming Slots</p>
                <span className="w-2 h-2 bg-rose-400 animate-pulse [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-rose-400 animate-pulse [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-rose-400 animate-pulse [animation-delay:300ms]" />
              </div>
            )}
          </section>
        </>
      ) : (
        <div>
          <p className="text-white">Service not found</p>
        </div>
      )}
    </div>
  );
};

export default ServicePage;
