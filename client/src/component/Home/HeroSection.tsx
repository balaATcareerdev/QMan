// import { colorBg } from "@/assets/export";
import { home_Bell } from "@/assets/export";
import PrimaryPurp from "@/component/Buttons/PrimaryPurp";
import SecondaryPurp from "@/component/Buttons/SecondaryPurp";
import BubbleDisplay from "@/component/Common/BubbleDisplay";
import CreateServiceModal from "@/component/Modals/CreateServiceModal";
import {
  BetweenHorizonalEnd,
  Briefcase,
  Clock,
  LoaderCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
  activeService: number;
  avgTime: number;
  availableSlots: number;
  isLoading: boolean;
}

const HeroSection = ({
  activeService,
  avgTime,
  availableSlots,
  isLoading,
}: HeroSectionProps) => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderCircle className="animate-spin" size={40} color="white" />
      </div>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white pt-30 px-20">
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
        <BubbleDisplay
          head="Active Service"
          value={activeService.toString()}
          desc={"Currently Running"}
          Icon={Briefcase}
        />
        <BubbleDisplay
          head="Avg Time Sec"
          value={avgTime.toString()}
          desc="Per Person"
          Icon={Clock}
        />
        <BubbleDisplay
          head="Available Slots"
          value={availableSlots.toString()}
          desc="For Booking"
          Icon={BetweenHorizonalEnd}
        />
      </div>

      <CreateServiceModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </section>
  );
};

export default HeroSection;
