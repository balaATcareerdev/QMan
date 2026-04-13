import PrimaryGradHome from "@/component/Buttons/PrimaryGradHome";
import SecondaryGradHome from "@/component/Buttons/SecondaryGradHome";
import type { ServiceType } from "@/types/types";

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
    <>
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
          <span className="text-lg">
            {slotCount.totalSlots} Slots Available
          </span>
        </div>

        <div className="justify-center items-center text-lg flex gap-2">
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
    </>
  );
};

export default UpcomingService;
