import { colorBg } from "@/assets/export";
import PrimaryPurp from "@/component/Buttons/PrimaryPurp";
import SecondaryPurp from "@/component/Buttons/SecondaryPurp";
import BubbleDisplay from "@/component/Common/BubbleDisplay";
import CreateServiceModal from "@/component/Modals/CreateServiceModal";
import { LoaderCircle } from "lucide-react";
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
    <section className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-position-[10%_60%] bg-size-[1200px] bg-no-repeat z-20 left-0 top-0"
        style={{ backgroundImage: `url("${colorBg}")` }}
      />
      <div className="relative z-20 text-white flex flex-col w-full items-center pt-60 gap-4">
        <h1 className="text-5xl font-bold">
          Book Your Service <span className="text-[#A591E3]">Instantly</span>
        </h1>
        <h2 className="text-2xl">
          Skip queues. <span className="text-[#A591E3]">Save time.</span>
        </h2>
      </div>

      {/* CTA */}
      <div className="relative z-20 flex gap-4 justify-center items-center pt-10">
        <PrimaryPurp text={"Create Service"} setOpenCreate={setOpenCreate} />
        <SecondaryPurp text={"Manage Service"} />
      </div>

      {/* Bubble Display */}
      <div className="flex justify-center items-center gap-10 pt-20">
        <BubbleDisplay
          head={"Active Service"}
          value={activeService.toString()}
        />
        <BubbleDisplay head={"Avg Time (Sec)"} value={avgTime.toString()} />
        <BubbleDisplay
          head={"Available Slots"}
          value={availableSlots.toString()}
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
