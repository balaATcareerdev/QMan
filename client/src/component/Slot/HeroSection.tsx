import Bubble from "@/component/Slot/Bubble";
import { getFormattedTime } from "@/util/slotUtils";
import { CalendarCheck, CircleCheck, Clock, HourglassIcon } from "lucide-react";

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
  status: string;
}

const HeroSection = ({
  stats,
  slotName,
  startTime,
  endTime,
  status,
}: HeroSectionProps) => {
  return (
    <div className="relative w-full z-20">
      <div className="pt-30 px-20 grid grid-cols-[30%_1fr] relative  gap-10">
        {/* Left Side */}
        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className="font-medium text-5xl">{slotName}</h1>
          <div className="bg-[#A35ED7]/10 flex items-center gap-2 px-3 py-1 rounded-sm border border-[#2d0e46]">
            <span className="w-3 h-3 rounded-full bg-[#3ed978]"></span>
            <span className="text-[#3ed978]">{status.toLocaleUpperCase()}</span>
          </div>
          <p className="font-medium text-2xl">
            Slot Timing :{" "}
            <span className="text-[#A35ED7]">
              {getFormattedTime(startTime)} - {getFormattedTime(endTime)}
            </span>
          </p>
        </div>

        {/* Right Side */}
        <div className="flex justify-around p-2 rounded-sm items-center">
          <Bubble
            Icon={CalendarCheck}
            color={"#bc82f8"}
            header="Total Booked"
            value={stats.totalBooked}
          />

          <Bubble
            Icon={CircleCheck}
            color={"#2dc16a"}
            header="Completed"
            value={stats.completed}
          />

          <Bubble
            Icon={HourglassIcon}
            color={"#fe8217"}
            header="Remaining"
            value={stats.remaining}
          />

          <Bubble
            Icon={Clock}
            color={"#bc82f8"}
            header="Avg Time"
            value={stats.avgTime}
            type="s"
            subHeader="per person"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
