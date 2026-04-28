import { servicesData } from "@/assets";
import ServiceList from "@/component/Customer/ServiceList";
import SlotList from "@/component/Customer/SlotList";
import TabMenu from "@/component/Customer/TabMenu";
import type { ServiceType, SlotType } from "@/types/types";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const CustomerHome = () => {
  const MenuItems = [
    { key: "trending", label: "Trending" },
    { key: "recent", label: "Recent" },
    { key: "favorites", label: "Favorites" },
    { key: "search", label: "Search" },
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
  const [services, setServices] = useState<ServiceType[]>([]);

  const [showSlots, setShowSlots] = useState<boolean>(false);
  const [slots, setSlots] = useState<SlotType[]>([]);
  const [isSlotLoading, setIsSlotLoading] = useState<boolean>(true);

  const fetchServices = async () => {
    setServices(servicesData);
    setIsServiceLoading(false);
  };

  const viewSlots = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!showSlots) setShowSlots(true);

    setIsSlotLoading(true);

    const timer = setTimeout(() => {
      setSlots([
        {
          id: "slot_001",
          slotName: "Library Slot 1",
          isPaused: false,
          serviceId: "srv_001",
          startTime: "2026-04-18T12:00:00Z",
          endTime: "2026-04-18T12:30:00Z",
          status: "active",
          capacity: 10,
          bookedCount: 6,
          currentToken: 3,
          avgTime: 2,
          completedCount: 2,
        },

        {
          id: "slot_001",
          slotName: "Library Slot 1",
          isPaused: false,
          serviceId: "srv_001",
          startTime: "2026-04-18T12:00:00Z",
          endTime: "2026-04-18T12:30:00Z",
          status: "active",
          capacity: 10,
          bookedCount: 6,
          currentToken: 3,
          avgTime: 2,
          completedCount: 2,
        },
      ]);

      setIsSlotLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices();
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="bg-linear-to-b from-black to-[#10040F] min-h-screen text-white pt-40 grid grid-cols-[20%_1fr_25%]">
      <section className="p-10  border-r border-[#414141]">
        <div className="border bg-[#2A2A2A]/30 p-2 border-[#414141] rounded-sm">
          {MenuItems.map((item, index) => (
            <TabMenu
              key={index}
              tabName={item.label}
              isActive={activeTab === item.key}
              onClick={
                item.key !== "search"
                  ? () => handleTabChange(item.key)
                  : () => {}
              }
            />
          ))}
        </div>
      </section>
      <section className="p-10">
        <h1 className="text-[#F6A1CF] font-medium text-4xl">
          {MenuItems.find((menuDetail) => menuDetail.key == activeTab)?.label}{" "}
          Services
        </h1>

        {isServiceLoading ? (
          <div className="flex justify-center items-center h-full p-20">
            <LoaderCircle className="animate-spin" size={40} />
          </div>
        ) : services.length > 0 ? (
          <div className="flex flex-col gap-10 mt-10">
            <ServiceList
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                viewSlots(e)
              }
            />
            <ServiceList
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                viewSlots(e)
              }
            />
            <ServiceList
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                viewSlots(e)
              }
            />
          </div>
        ) : (
          <div className="text-white">
            <p>No Services</p>
          </div>
        )}
      </section>
      <section>
        {showSlots && (
          <div className="border border-[#9711FB] p-5 rounded-md">
            <h1 className="text-2xl">
              Slots Available - <span className="text-[#FF1994]">Library</span>
            </h1>

            <span className="text-[#797979] text-sm">11-4-2026</span>

            {isSlotLoading ? (
              <div className="flex justify-center items-center">
                <LoaderCircle className="animate-spin" size={40} />
              </div>
            ) : slots.length > 0 ? (
              <div className="flex flex-col gap-2">
                <SlotList />
                <SlotList />
                <SlotList />
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
