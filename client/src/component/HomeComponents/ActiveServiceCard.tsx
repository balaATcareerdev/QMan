import HeaderClient from "@/pages/Client/ServiceComponent/HeaderClient";
import ServiceDateAndSlotMeta from "@/pages/Client/ServiceComponent/ServiceDateAndSlotMeta";
import SlotsListClient from "@/component/HomeComponents/SlotsList";
import { ChevronRight, MoreVertical } from "lucide-react";

export type SlotStatus = "Active" | "Upcoming";

export type SlotDataType = {
  slotName: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
};

interface ActiveServiceCardProps {
  serviceName: string;
  description: string;
  scheduledDate: string;
  slots: SlotDataType[];
}

const ActiveServiceCard = ({
  serviceName,
  description,
  scheduledDate,
  slots,
}: ActiveServiceCardProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Top */}

      <div className="flex items-start justify-between">
        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          Live now
        </span>

        <button>
          <MoreVertical className="h-5 w-5 text-slate-500" />
        </button>
      </div>

      {/* Service */}
      <HeaderClient serviceName={serviceName} description={description} />

      {/* Meta */}
      <ServiceDateAndSlotMeta
        scheduledDate={scheduledDate}
        slotLength={slots.length}
      />

      <hr className="my-8" />

      {/* Slot Status */}
      <SlotsListClient slots={slots} />

      {/* Footer */}
      <button className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 py-5 text-xl font-semibold hover:bg-slate-50">
        Manage Service
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};
export default ActiveServiceCard;
