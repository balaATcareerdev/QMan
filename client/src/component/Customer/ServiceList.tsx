import { Service_Icon } from "@/assets/export";
import { Calendar, Clock, RockingChairIcon } from "lucide-react";

interface ServiceListProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  serviceName: string;
  slotsLeft: number;
  bookingsLeft: number;
  date: string;
}

const ServiceList = ({
  onClick,
  serviceName,
  slotsLeft,
  bookingsLeft,
  date,
}: ServiceListProps) => {
  return (
    <div className="grid grid-cols-[30%_1fr_30%] p-5 py-2.5 bg-linear-to-r from-[#a78fd7]/10 to-[#190b34]/20 outline rounded-sm hover:outline-[#FF1994] transition-all duration-300 outline-[#1c1c1c] cursor-pointer">
      <div
        className="grid grid-cols-[40%_50%]
       items-center gap-1"
      >
        <div className="flex justify-center items-center bg-[#45284c] w-20 h-20 rounded-full">
          <img
            src={Service_Icon}
            alt=""
            className="w-full max-w-25 h-auto object-contain"
          />
        </div>
        <div>
          <h1 className="text-lg line-clamp-1">{serviceName}</h1>
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <p className="text-sm text-[#A09999]">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5">
        <div className="flex gap-2 text-lg justify-center items-center">
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#a78fd7]/10 border border-[#a78fd7]/30">
            <RockingChairIcon color="#a78fd7" size={23} />
          </div>

          <div className="flex flex-col gap-1">
            <span>{slotsLeft} Slots</span>
            <span className="text-green-400">Available</span>
          </div>
        </div>

        <span className="w-px h-15 bg-gray-700 rounded-full"></span>

        <div className="flex gap-2">
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#fd619c]/10 border border-[#fd619c]/30">
            <Clock color="#fd619c" size={23} />
          </div>
          <div className="flex flex-col gap-1">
            <span>{bookingsLeft} Bookings</span>
            <span className="text-gray-400 text-sm">Left</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center text-sm">
        <button
          onClick={onClick}
          className="bg-linear-to-r from-[#BC6B96] hover:from-[#BC6B96]/50 to-[#737F97] hover:to-[#737F97]/50 px-4 py-2 rounded-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ServiceList;
