import { ArrowRight } from "lucide-react";

interface ServiceHeaderProps {
  category: "Active" | "Upcoming";
}

const ServiceHeader = ({ category }: ServiceHeaderProps) => {
  return (
    <div className="flex text-white items-center gap-4 mt-10">
      {/* lEFT */}

      <div className="flex justify-center items-center gap-1 text-2xl">
        <span className="bg-[#A591E3] rounded-full w-2 h-2"></span>
        <p className="w-full">{category} services</p>
      </div>

      {/* mID */}
      <hr className="flex-1 h-px bg-[#A591E3]" />

      {/* Right */}
      <button
        onClick={() => {}}
        className="flex items-center gap-1 text-nowrap text-lg active:scale-105 justify-center"
      >
        View All
        <ArrowRight />
      </button>
    </div>
  );
};

export default ServiceHeader;
