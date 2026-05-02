import PrimaryPinkService from "@/component/Buttons/PrimaryPinkService";
import SecondaryPinkService from "@/component/Buttons/SecondaryPinkService";
import { Clock, Edit, HourglassIcon, Play } from "lucide-react";

interface UpcomingSlotCardProps {
  slotName: string;
  startingTime: string;
  pendingTime: {
    hours: number;
    minutes: number;
    expired: boolean;
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
  const handleStartSlot = () => {
    console.log(`Starting slot: ${slotName}`);
  };

  return (
    <>
      <div className="grid grid-cols-[35%_20%_1fr] min-w-7xl bg-[#0c0a1a] px-5 py-10 rounded-lg border border-[#16122c]">
        <div className="flex">
          <div className="bg-linear-to-b from-[#211532] to-[#1f142f] w-30 h-30   rounded-full flex justify-center items-center">
            <Clock size={60} color="#ba6ffb" />
          </div>
          <div className="flex flex-col justify-around px-2">
            <p className="text-[#A35ED7] text-2xl font-semibold">{slotName}</p>
            <div className="flex text-lg text-gray-300 items-center gap-1">
              <Clock />
              <p>{startingTime}</p>
            </div>

            <div className="flex gap-1 items-center">
              <HourglassIcon color="#fe8217" />
              <p className="text-[#fe8217] text-lg">
                {pendingTime.expired
                  ? "Expired"
                  : "starts in " +
                    pendingTime.hours +
                    "h " +
                    pendingTime.minutes +
                    "m"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-col">
            <p className="font-semibold text-lg text-white">Total Booked</p>
            <p className="font-semibold text-[#A35ED7] text-4xl">
              {totalBooked}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 text-white">
          <div className="flex flex-col justify-center items-center gap-2 px-2">
            <h1 className="text-lg font-semibold">Progress</h1>
            {progress > 0 ? (
              <p className="font-medium text-2xl text-[#FF5EB4]">{progress}%</p>
            ) : (
              <p className="font-medium text-2xl text-[#FF5EB4]">No Progress</p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-10">
            <PrimaryPinkService
              text="Start Now"
              onClick={() => handleStartSlot()}
              Icon={Play}
            />
            <SecondaryPinkService text="Edit" Icon={Edit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingSlotCard;
