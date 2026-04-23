import PrimaryPinkService from "@/component/Buttons/PrimaryPinkService";
import SecondaryPinkService from "@/component/Buttons/SecondaryPinkService";
import { useNavigate } from "react-router";

interface SlotCardProps {
  slotName: string;
  startingTime: string;
  endingTime: string;
  pendingTime: {
    hours: number;
    minutes: number;
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
    <div className="h-28 w-5xl grid grid-cols-[30%_30%_20%_20%] border-white hover:border-[#FF1994] border p-3 justify-center items-center bg-linear-to-r from-[#420354] to-[#000000] transition-colors duration-300 rounded-sm">
      <div className="flex flex-col justify-center items-start">
        <p className="text-[#FA73C4] font-medium text-3xl">{slotName}</p>
        <p className="font-medium text-sm text-[#B9B9B9]">
          {startingTime} - {endingTime}
        </p>
        <p className="text-white text-sm">
          Expires in {pendingTime.hours}h {pendingTime.minutes}m
        </p>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <p className="font-medium text-xl text-white">
          Total Booked: {totalBooked}
        </p>
        <div className="flex justify-center items-end gap-2">
          <p className="font-medium text-xl text-white">
            Servicing{" "}
            <span className="text-[#FF1994] text-2xl">#{servicing}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <p className="font-medium text-2xl text-[#FF5EB4]">
          Progress: <span>{progress}%</span>
        </p>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <PrimaryPinkService
          text="Manage"
          onClick={() => navigate(`/client/slot/${id}`)}
        />
        {isPaused ? (
          <SecondaryPinkService text="Resume" />
        ) : (
          <SecondaryPinkService text="Pause" />
        )}
      </div>
    </div>
  );
};

export default SlotCard;
