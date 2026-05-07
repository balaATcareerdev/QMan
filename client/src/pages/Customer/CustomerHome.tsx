import { book_Image } from "@/assets/export";
import ServiceList from "@/component/Customer/ServiceList";
import SlotList from "@/component/Customer/SlotList";
import TabMenu from "@/component/Customer/TabMenu";
import {
  fetchServicesWithMeta,
  fetchSlotsForService,
} from "@/services/services.customer.api";
import type { SlotType } from "@/types/types";
import {
  Activity,
  ClockIcon,
  Heart,
  LoaderCircle,
  SearchIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

type ServiceWithMeta = {
  id: string;
  name: string;
  slotsLeft: number;
  bookingsLeft: number;
};

const CustomerHome = () => {
  const MenuItems = [
    { key: "trending", label: "Trending", Icon: Activity },
    { key: "recent", label: "Recent", Icon: ClockIcon },
    { key: "favorites", label: "Favorites", Icon: Heart },
    { key: "search", label: "Search", Icon: SearchIcon },
  ];

  const validTabs = MenuItems.map((item) => item.key);

  const [searchParam, setSearchParam] = useSearchParams();
  const tabFromUrl = searchParam.get("tab");

  const activeTab = validTabs.includes(tabFromUrl || "")
    ? tabFromUrl
    : "trending";

  const handleTabChange = (tab: string) => {
    setShowSlots(false);
    setIsServiceLoading(true);
    setSearchParam({ tab });
  };

  const [isServiceLoading, setIsServiceLoading] = useState(true);
  const [services, setServices] = useState<ServiceWithMeta[]>([]);

  const [showSlots, setShowSlots] = useState<boolean>(false);
  const [slots, setSlots] = useState<SlotType[]>([]);
  const [isSlotLoading, setIsSlotLoading] = useState<boolean>(true);

  const slotTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const viewSlots = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    if (!showSlots) setShowSlots(true);

    setIsSlotLoading(true);

    if (slotTimerRef.current) clearTimeout(slotTimerRef.current);

    slotTimerRef.current = setTimeout(() => {
      fetchSlotsForService(id).then((slots) => {
        setSlots(slots);
      });

      setIsSlotLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServicesWithMeta().then((services) => {
        setServices(services);
        setIsServiceLoading(false);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    return () => {
      const timer = slotTimerRef.current;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-linear-to-br from-black to-[#100721] text-white pt-20 grid grid-cols-[15%_1fr_25%] overflow-hidden h-screen">
      <section className="p-5 sticky border-r border-[#414141] flex flex-col justify-start gap-10">
        <div className="p-2 border-[#414141] rounded-sm flex flex-col gap-2">
          {MenuItems.map((item, index) => (
            <TabMenu
              Icon={item.Icon}
              key={index}
              tabName={item.label}
              isActive={activeTab === item.key}
              isSelected={activeTab === item.key}
              onClick={
                item.key !== "search"
                  ? () => handleTabChange(item.key)
                  : () => {}
              }
            />
          ))}
        </div>

        <div className="flex flex-col justify-center items-center bg-[#fc76bd]/5 rounded-lg p-2 outline outline-[#ff66b8]/20">
          <div className="grid grid-cols-2 gap-2 justify-center items-center">
            <img
              src={book_Image}
              alt=""
              className="max-w-40 w-full h-auto object-contain"
            />
            <p className="text-white text-sm font-semibold">
              Book More, save more!
            </p>
          </div>
          <div className="p-1 text-center">
            <p className="text-gray-300 text-lg">
              Grab the best slots before they are gone!
            </p>
          </div>
        </div>
      </section>

      <section className="p-10 overflow-y-auto no-scrollbar">
        <h1 className="text-[#F6A1CF] font-medium text-4xl">
          {MenuItems.find((menuDetail) => menuDetail.key == activeTab)?.label}{" "}
          Services
        </h1>
        <h2 className="text-gray-400">
          Explore our service and book your preferred slots!
        </h2>

        {isServiceLoading ? (
          <div className="flex justify-center items-center h-full p-20">
            <LoaderCircle className="animate-spin" size={40} />
          </div>
        ) : services.length > 0 ? (
          <div className="flex flex-col gap-10 mt-10">
            {services.map((service) => (
              <ServiceList
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  viewSlots(e, service.id)
                }
                serviceName={service.name}
                slotsLeft={service.slotsLeft}
                bookingsLeft={service.bookingsLeft}
              />
            ))}
          </div>
        ) : (
          <div className="text-white">
            <p>No Services</p>
          </div>
        )}
      </section>

      <section className="overflow-y-auto no-scrollbar p-5">
        {showSlots && (
          <div className="outline outline-[#ff66b8]/20 p-5 rounded-md bg-[#fc76bd]/5">
            <h1 className="text-2xl">
              Slots Available - <span className="text-[#FF1994]">Library</span>
            </h1>

            <span className="text-[#797979] text-sm flex items-center gap-1">
              <ClockIcon size={12} />
              11-4-2026
            </span>

            {isSlotLoading ? (
              <div className="flex justify-center items-center">
                <LoaderCircle className="animate-spin" size={40} />
              </div>
            ) : slots.length > 0 ? (
              <div className="flex flex-col gap-3">
                {slots.map((slot) => (
                  <SlotList
                    startingTime={slot.startTime}
                    endingTime={slot.endTime}
                  />
                ))}
              </div>
            ) : (
              <div>No slots available</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default CustomerHome;
