import { getFormattedTime, hexToRgba } from "@/util/slotUtils";
import { Clock, Hourglass, type LucideIcon } from "lucide-react";

interface ColumnElemProps {
  slotName: string;
  serviceName: string;
  startTime: string;
  endTime?: string;
  type: "active" | "upcoming" | "backlog" | "history";
  Icon: LucideIcon;
  color: string;
}

const ColumnElem = ({
  slotName,
  serviceName,
  startTime,
  endTime,
  type,
  Icon,
  color,
}: ColumnElemProps) => {
  return (
    <div
      style={{
        borderColor: hexToRgba(color, 0.5),
        backgroundImage: `linear-gradient(to bottom, ${hexToRgba(
          color,
          0.15,
        )}, rgba(0,0,0,0.2))`,
      }}
      className="p-5 rounded-lg border-l border-t"
    >
      {/* Top */}
      <div className="flex gap-2">
        {/* Icon */}
        <div className="flex justify-center items-center">
          <div className="w-15 h-15 flex justify-center items-center bg-[#ffffff]/7 rounded-full">
            <Icon />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1">
          <h1 style={{ color: color }} className="text-xl">
            {serviceName}
          </h1>
          <span className="font-semibold text-sm">{slotName}</span>

          <div className="flex items-center gap-1 font-light text-gray-400">
            <Clock size={15} />
            <span className="text-sm">
              {getFormattedTime(startTime)} -
              {endTime ? getFormattedTime(endTime) : "N/A"}
            </span>
          </div>

          <div className="text-sm">
            {type === "active" ? (
              <div className="flex items-center gap-1">
                <Hourglass color="#FF7700" size={14} />
                <p className="text-[#FF7700]">Your Turn in 10min</p>
              </div>
            ) : type === "upcoming" ? (
              <p className="text-[#878FFF]">Starts in 10min</p>
            ) : type === "backlog" ? (
              <p className="text-[#FF0000]">Again in 10min</p>
            ) : (
              <p>Completed</p>
            )}
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end items-center mt-5">
        <button className="bg-linear-to-r from-[#FA73C4] to-[#86072F] text-sm px-2.5 p-1 rounded-sm hover:from-[#FA73C4]/50 hover:to-[#86072F]/50 transition-all duration-300">
          {type !== "history" ? "Cancel Booking" : "Delete"}
        </button>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col">
          {/* <h1 style={{ color: color }} className="text-xl">
            {serviceName}
          </h1>
          <span className="font-semibold text-sm">{slotName}</span> */}
        </div>
      </div>
    </div>
  );
};

export default ColumnElem;
