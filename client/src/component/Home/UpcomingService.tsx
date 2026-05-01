import PrimaryGradHome from "@/component/Buttons/PrimaryGradHome";
import SecondaryGradHome from "@/component/Buttons/SecondaryGradHome";
import type { ServiceType } from "@/types/types";
import { Calendar1, ClockArrowUp } from "lucide-react";

const UpcomingService = ({
  service,
  slotCount,
  setOpenEdit,
  setSelectedService,
}: {
  service: ServiceType;
  slotCount: { totalSlots: number };
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceType | null>>;
}) => {
  return (
    <div className="text-white grid grid-cols-[10%_60%_15%_1fr] min-w-360 w-full bg-[#0e0e1f] p-5 rounded-3xl">
      <div className="flex justify-center items-center">
        <div className="bg-linear-to-b from-[#211532] to-[#1f142f] p-8 rounded-4xl">
          <ClockArrowUp size={70} color="#ba6ffb" />
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
        <span
          className={`text-lg ${slotCount.totalSlots > 0 ? "" : "text-orange-600"}`}
        >
          {slotCount.totalSlots} Slots Available
        </span>
      </div>

      <div className="flex justify-center items-center gap-2">
        <PrimaryGradHome
          text="Edit"
          onClick={() => {
            setSelectedService(service);
            setOpenEdit(true);
          }}
        />
        <SecondaryGradHome text="Start Now" />
      </div>
    </div>
  );
};

export default UpcomingService;
