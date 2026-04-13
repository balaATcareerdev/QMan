import PrimaryGradHome from "@/component/Buttons/PrimaryGradHome";
import type { ServiceType } from "@/types/types";

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
  return (
    <div
      className={`text-white w-2/3 grid grid-cols-[50%_30%_20%] border border-[#FFFFFF] px-5 py-2.5 rounded-lg bg-[#ffffff]/10 hover:border-[#FF1994] hover:bg-[#FF1994]/10 transition-all duration-300 hover:scale-105`}
    >
      <div className="flex flex-col justify-between items-start">
        <h1 className="text-2xl font-medium">{service.name}</h1>
        <h2 className="text-lg font-light text-[#BDBDBD] line-clamp-2">
          {service.description}
        </h2>
        <span className="text-lg font-light">
          {new Date(service.createdAt)
            .toLocaleDateString()
            .toString()
            .replaceAll("/", "-")}
        </span>
      </div>

      <div className="flex flex-col justify-center items-center">
        <span className="text-[#00FF0D] text-lg font-light">
          {avgTimePerService.totalSlots} Active Slots
        </span>

        <span className="text-lg">{avgTimePerService.Avg} Sec/Person</span>
      </div>

      <div className="flex justify-center items-center text-lg">
        <PrimaryGradHome text="Manage Service" />
      </div>
    </div>
  );
};

export default ServiceCard;
