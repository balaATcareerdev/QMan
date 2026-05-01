import type { ServiceType } from "@/types/types";
import { Activity, Calendar1 } from "lucide-react";
import { useNavigate } from "react-router";

const ServiceCard = ({
  service,
  avgTimePerService,
}: {
  service: ServiceType;
  avgTimePerService: {
    serviceId: string;
    Avg: number;
    totalSlots: number;
  };
}) => {
  const navigate = useNavigate();

  return (
    <div className="text-white grid grid-cols-[10%_60%_15%_1fr] min-w-360 w-full bg-[#0e0e1f] p-5 rounded-3xl">
      <div className="flex justify-center items-center">
        <div className="bg-linear-to-b from-[#211532] to-[#1f142f] p-8 rounded-4xl">
          <Activity size={70} color="#ba6ffb" />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <h1 className="text-2xl font-medium">{service.name}</h1>
        <p className="text-lg font-light text-[#BDBDBD] line-clamp-2">
          {service.description}
        </p>

        <div className="flex justify-start items-end gap-2">
          <Calendar1 />
          <span className="text-sm text-gray-500">
            {new Date(service.createdAt)
              .toLocaleDateString()
              .toString()
              .replaceAll("/", "-")}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <span className="text-[#00FF0D] text-lg font-light">
          {avgTimePerService.totalSlots} Active Slots
        </span>
        <span className="text-lg">{avgTimePerService.Avg} Sec/Person</span>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="px-4 py-2 bg-linear-to-r from-[#9711FB] to-[#FA73C4] hover:from-[#9711FB]/50 hover:to-[#FA73C4]/50 transition-colors duration-300 text-sm rounded-sm"
          onClick={() => navigate(`service/${service.id}`)}
        >
          Manage Service
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
