import { formatTime, getMeridiem } from "@/util/dateUtilts";
import { CalendarDays, Pencil, Play } from "lucide-react";

interface UpcomingSlotCardProps {
  startTime: string;
  bookedCount: number;
}

const UpcomingSlotCard = ({
  startTime,
  bookedCount,
}: UpcomingSlotCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Left */}
      <div className="flex items-center gap-6">
        {/* Time */}

        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-3xl bg-amber-50">
          <span className="text-4xl font-bold text-orange-600">
            {formatTime(new Date(startTime), "hh:mm")}
          </span>

          <span className="text-xl font-semibold text-orange-600">
            {getMeridiem(new Date(startTime))}
          </span>
        </div>

        {/* Details */}

        <div>
          <h3 className="text-3xl font-bold text-slate-900">
            <span className="text-blue-600">General Consultation</span> –
            Afternoon Slot
          </h3>

          <p className="mt-2 text-xl text-slate-500">
            Registration counter for general consultation
          </p>

          <div className="mt-4 flex items-center gap-5 text-lg text-slate-500">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              21 July 2026
            </div>

            <span>•</span>

            <span>{bookedCount} customers</span>
          </div>
        </div>
      </div>

      {/* Right */}

      <div className="flex gap-4">
        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg font-semibold transition hover:bg-slate-50">
          <Pencil className="h-5 w-5" />
          Edit
        </button>

        <button className="flex items-center gap-3 rounded-xl bg-orange-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-orange-700">
          <Play className="h-5 w-5 fill-white" />
          Start Now
        </button>
      </div>
    </div>
  );
};

export default UpcomingSlotCard;
