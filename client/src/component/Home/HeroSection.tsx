// import { colorBg } from "@/assets/export";
import { home_Bell } from "@/assets/export";
import { getServiceStats } from "@/auth/serviceApi";
import PrimaryPurp from "@/component/Buttons/PrimaryPurp";
import SecondaryPurp from "@/component/Buttons/SecondaryPurp";
import BubbleDisplay from "@/component/Common/BubbleDisplay";
import CreateServiceModal from "@/component/Modals/CreateServiceModal";
import { useQuery } from "@tanstack/react-query";
import { BetweenHorizonalEnd, Briefcase, Clock, Zap } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const { data: serviceStats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["service_stats"],
    queryFn: async () => {
      const response = await getServiceStats();
      if (response.success) {
        console.log(response.stats);
      }
      return response.stats;
    },
  });

  return (
    <section className="relative w-full overflow-hidden text-white px-20">
      <div className="grid grid-cols-2">
        <div className="text-5xl font-bold gap-2 flex flex-col">
          <h1 className="text-white">Book Your Service</h1>
          <h2 className="text-[#b549dd] flex items-end">
            Instantly
            <Zap size={40} fill="#b549dd" />
          </h2>

          <p className="text-lg font-normal mt-5">
            Skip queues. <span className="text-[#b549dd]">Save time.</span>
          </p>

          <div className="flex items-center justify-start gap-5 mt-10">
            <PrimaryPurp
              text={"Create Service"}
              setOpenCreate={setOpenCreate}
            />
            <SecondaryPurp text="Manage Services" />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={home_Bell}
            alt=""
            className="w-full max-w-125 h-auto object-contain"
          />
        </div>
      </div>

      {/* Stats */}

      <div className="flex justify-center items-center gap-10 mt-15">
        {isStatsLoading ? (
          <div className="flex items-end gap-2 h-10">
            <span className="w-2 h-4 bg-[#b549dd] rounded-full animate-bar1" />
            <span className="w-2 h-8 bg-[#b549dd] rounded-full animate-bar2" />
            <span className="w-2 h-6 bg-[#b549dd] rounded-full animate-bar3" />
          </div>
        ) : (
          <>
            <BubbleDisplay
              head="Active Service"
              value={serviceStats?.activeService.toString() ?? "0"}
              desc={"Currently Running"}
              Icon={Briefcase}
            />
            <BubbleDisplay
              head="Avg Time Sec"
              value={serviceStats?.avgTime.toString() ?? "0"}
              desc="Per Person"
              Icon={Clock}
            />
            <BubbleDisplay
              head="Available Slots"
              value={serviceStats?.availableSlots.toString() ?? "0"}
              desc="For Booking"
              Icon={BetweenHorizonalEnd}
            />
          </>
        )}
      </div>

      <CreateServiceModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </section>
  );
};

export default HeroSection;
