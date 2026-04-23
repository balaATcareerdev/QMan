import Bubble from "@/component/Slot/Bubble";
import { getFormattedTime } from "@/util/slotUtils";

interface HeroSectionProps {
  stats: {
    totalBooked: number;
    completed: number;
    remaining: number;
    avgTime: number;
  };
  slotName: string;
  startTime: string;
  endTime: string;
}

const HeroSection = ({
  stats,
  slotName,
  startTime,
  endTime,
}: HeroSectionProps) => {
  return (
    <div className="relative w-full z-20 pb-32">
      <div className="pt-30 px-20 grid grid-cols-[30%_50%_20%] relative  gap-10">
        {/* Left Side */}
        <div className="flex flex-col items-start justify-center gap-1">
          <h1 className="font-medium text-5xl">{slotName}</h1>
          <p className="font-medium text-2xl">
            Slot Timing :{" "}
            <span className="text-[#A5A5A5]">
              {getFormattedTime(startTime)} - {getFormattedTime(endTime)}
            </span>
          </p>
        </div>

        {/* Right Side */}
        <div className="bg-[#9711FB]/10 flex justify-around p-2 rounded-sm border border-[#585858] items-center">
          <Bubble text={"Total Booked"} value={stats.totalBooked} />
          <span className="bg-[#767474] h-8 w-0.5 rounded-sm"></span>
          <Bubble text={"Completed"} value={stats.completed} />
          <span className="bg-[#767474] h-8 w-0.5 rounded-sm"></span>
          <Bubble text={"Remaining"} value={stats.remaining} />
        </div>

        <div className="flex justify-start items-center">
          <div className="bg-[#9711FB]/10 flex p-2 rounded-sm border border-[#585858] items-center">
            <Bubble text={"Avg Time"} value={stats.avgTime} type="s" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
