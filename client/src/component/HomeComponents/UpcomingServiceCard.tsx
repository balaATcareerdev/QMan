import type { SlotDataType } from "@/component/HomeComponents/ActiveServiceCard";
import HeaderClient from "@/pages/Client/ServiceComponent/HeaderClient";
import ServiceDateAndSlotMeta from "@/pages/Client/ServiceComponent/ServiceDateAndSlotMeta";
import SlotsListClient from "@/component/HomeComponents/SlotsList";
import { getTimeRemaining } from "@/util/dateUtilts";
import { ChevronRight, Edit, MoreVertical } from "lucide-react";

interface UpcomingServiceCardProps {
  serviceName: string;
  description: string;
  scheduledDate: string;
  slots: SlotDataType[];
}

const UpcomingServiceCard = ({
  serviceName,
  description,
  scheduledDate,
  slots,
}: UpcomingServiceCardProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Top */}

      <div className="flex items-start justify-between">
        <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
          {getTimeRemaining(scheduledDate)}
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
        Edit
        <Edit className="h-5 w-5" />
      </button>

      <button className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 py-5 text-xl font-semibold hover:bg-slate-50">
        Start Now
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default UpcomingServiceCard;
