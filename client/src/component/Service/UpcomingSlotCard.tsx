import PrimaryPinkService from "@/component/Buttons/PrimaryPinkService";
import SecondaryPinkService from "@/component/Buttons/SecondaryPinkService";

interface UpcomingSlotCardProps {
  slotName: string;
  startingTime: string;
  pendingTime: {
    hours: number;
    minutes: number;
  };
  totalBooked: number;
  progress: number;
}

const UpcomingSlotCard = ({
  slotName,
  startingTime,
  pendingTime,
  totalBooked,
  progress,
}: UpcomingSlotCardProps) => {
  return (
    <div className="h-28 w-5xl grid grid-cols-[30%_30%_20%_20%] border-white hover:border-[#FF1994] border p-3 justify-center items-center bg-linear-to-r from-[#420354] to-[#000000] transition-colors duration-300 rounded-sm">
      <div className="flex flex-col justify-center items-start">
        <p className="text-[#FA73C4] font-medium text-3xl">{slotName}</p>
        <p className="font-medium text-sm text-[#B9B9B9]">{startingTime}</p>
        <p className="text-white text-sm">
          Starts in {pendingTime.hours}h {pendingTime.minutes}m
        </p>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <p className="font-medium text-xl text-white">
          Total Booked: {totalBooked}
        </p>
      </div>

      <div className="flex justify-center items-center">
        {progress > 0 ? (
          <p className="font-medium text-2xl text-[#FF5EB4]">
            Progress: {progress}%
          </p>
        ) : (
          <p className="font-medium text-2xl text-[#FF5EB4]">No Progress</p>
        )}
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <PrimaryPinkService text="Start Now" />
        <SecondaryPinkService text="Edit" />
      </div>
    </div>
  );
};

export default UpcomingSlotCard;
