import { getFormattedTime } from "@/util/slotUtils";

interface ColumnElemProps {
  slotName: string;
  serviceName: string;
  startTime: string;
  endTime?: string;
  type: "active" | "upcoming" | "backlog" | "history";
}

const ColumnElem = ({
  slotName,
  serviceName,
  startTime,
  endTime,
  type,
}: ColumnElemProps) => {
  return (
    <div className="bg-[#9F81D0]/10 p-5 rounded-lg">
      <h1 className="text-2xl text-[#FFA4E5]">{serviceName}</h1>
      <div className="flex items-end gap-2">
        <p className="text-lg font-semibold">{slotName.slice(0, 10)}...</p>
        <span className="text-sm text-[#AEAEAE]">
          {getFormattedTime(startTime)}
          {endTime ? `-${getFormattedTime(endTime)}` : "N/A"}
        </span>
      </div>
      <div>
        {type === "active" ? (
          <p className="text-[#FF7700]">Your Turn in 10min</p>
        ) : type === "upcoming" ? (
          <p className="text-[#878FFF]">Starts in 10min</p>
        ) : type === "backlog" ? (
          <p className="text-[#FF0000]">Again in 10min</p>
        ) : (
          <p>Completed</p>
        )}
      </div>

      <div className="flex justify-center items-center mt-5">
        <button className="bg-linear-to-r from-[#FA73C4] to-[#86072F] text-sm px-2.5 p-1 rounded-sm hover:from-[#FA73C4]/50 hover:to-[#86072F]/50 transition-all duration-300">
          {type !== "history" ? "Cancel Booking" : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ColumnElem;
