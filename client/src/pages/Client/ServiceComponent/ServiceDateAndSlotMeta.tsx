import { formatDate } from "@/util/dateUtilts";
import { CalendarDays, Clock3 } from "lucide-react";

const ServiceDateAndSlotMeta = ({
  scheduledDate,
  slotLength,
}: {
  scheduledDate: string;
  slotLength: number;
}) => {
  return (
    <div className="mt-8 flex items-center gap-5 text-lg text-slate-500">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-5 w-5" />
        {formatDate(new Date(scheduledDate), "dd MMMM yyyy")}
      </div>

      <span>•</span>

      <div className="flex items-center gap-2">
        <Clock3 className="h-5 w-5" />
        {slotLength} Slots
      </div>
    </div>
  );
};

export default ServiceDateAndSlotMeta;
