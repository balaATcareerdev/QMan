import PrimaryPinkService from "@/component/Buttons/PrimaryPinkService";
import SecondaryPinkService from "@/component/Buttons/SecondaryPinkService";
import { Activity, Blocks, Clock, HourglassIcon } from "lucide-react";
import { useNavigate } from "react-router";

interface SlotCardProps {
  slotName: string;
  startingTime: string;
  endingTime: string;
  pendingTime: {
    hours: number;
    minutes: number;
    expired: boolean;
  };
  totalBooked: number;
  servicing: number;
  progress: number;
  isPaused: boolean;
  id: string;
}

const SlotCard = ({
  slotName,
  startingTime,
  endingTime,
  pendingTime,
  totalBooked,
  servicing,
  progress,
  isPaused,
  id,
}: SlotCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-[35%_20%_1fr] min-w-7xl bg-[#0c0a1a] px-5 py-10 rounded-lg border border-[#16122c]">
      <div className="flex">
        <div className="bg-linear-to-b from-[#211532] to-[#1f142f] w-30 h-30   rounded-full flex justify-center items-center">
          <Activity size={60} color="#ba6ffb" />
        </div>
        <div className="flex flex-col justify-around px-2">
          <p className="text-[#A35ED7] text-2xl font-semibold">{slotName}</p>
          <div className="flex text-lg text-gray-300 items-center gap-1">
            <Clock />
            <p>
              {startingTime} - {endingTime}
            </p>
          </div>

          <div className="flex gap-1 items-center ">
            <HourglassIcon color="#fe8217" />
            <p className="text-[#fe8217] text-lg flex">
              {pendingTime.expired ? "Overdue " : "Expires in "}
              {pendingTime.hours}h {pendingTime.minutes}m
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-rows-2 gap-4 justify-center items-center">
        <div className="flex flex-col">
          <p className="font-semibold text-lg text-white">Total Booked</p>
          <p className="font-semibold text-[#A35ED7] text-4xl">{totalBooked}</p>
        </div>

        <div className="flex flex-col">
          <p className="font-semibold text-lg text-white">Servicing</p>
          <p className="font-semibold text-[#A35ED7] text-4xl">#{servicing}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 text-white">
        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <h1 className="text-lg font-semibold">Progress</h1>
          <span className="text-4xl text-[#eb4a9d]">{progress}%</span>
          <div className="w-full h-9 bg-[#535353]/50 rounded-xl relative mb-20 overflow-hidden">
            <div
              className="absolute bg-linear-to-r from-[#d039b7] to-[#ab53e6] h-full rounded-xl transition-all duration-1000 ease-in-out"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <PrimaryPinkService
            text="Manage"
            onClick={() => navigate(`/client/slot/${id}`)}
            Icon={Blocks}
          />
          <SecondaryPinkService text={isPaused ? "Resume" : "Pause"} />
        </div>
      </div>
    </div>
    // <div className="h-28 w-5xl grid grid-cols-[30%_30%_20%_20%] border-white hover:border-[#FF1994] border p-3 justify-center items-center bg-linear-to-r from-[#420354] to-[#000000] transition-colors duration-300 rounded-sm">
    //   <div className="flex flex-col justify-center items-start">
    //     <p className="text-[#FA73C4] font-medium text-3xl">{slotName}</p>
    //     <p className="font-medium text-sm text-[#B9B9B9]">
    //       {startingTime} - {endingTime}
    //     </p>
    //     <p className="text-white text-sm">
    //       Expires in {pendingTime.hours}h {pendingTime.minutes}m
    //     </p>
    //   </div>

    //   <div className="flex flex-col justify-center items-center gap-2">
    //     <p className="font-medium text-xl text-white">
    //       Total Booked: {totalBooked}
    //     </p>
    //     <div className="flex justify-center items-end gap-2">
    //       <p className="font-medium text-xl text-white">
    //         Servicing{" "}
    //         <span className="text-[#FF1994] text-2xl">#{servicing}</span>
    //       </p>
    //     </div>
    //   </div>

    //   <div className="flex justify-center items-center">
    //     <p className="font-medium text-2xl text-[#FF5EB4]">
    //       Progress: <span>{progress}%</span>
    //     </p>
    //   </div>

    //   <div className="flex flex-col justify-center items-center gap-2">
    //     <PrimaryPinkService
    //       text="Manage"
    //       onClick={() => navigate(`/client/slot/${id}`)}
    //     />
    //     {isPaused ? (
    //       <SecondaryPinkService text="Resume" />
    //     ) : (
    //       <SecondaryPinkService text="Pause" />
    //     )}
    //   </div>
    // </div>
  );
};

export default SlotCard;
