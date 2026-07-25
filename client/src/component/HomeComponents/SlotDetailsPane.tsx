import type { SlotDataType } from "@/component/HomeComponents/ActiveServiceCard";
import { formatTime } from "@/util/dateUtilts";

const SlotDetailsPane = ({ slot }: { slot: SlotDataType }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xl font-semibold">{slot.slotName}</p>
        <p className="text-lg text-slate-500">
          {formatTime(new Date(slot.startTime), "HH:mm")} -{" "}
          {formatTime(new Date(slot.endTime), "HH:mm")}
          AM
        </p>
      </div>

      <span
        className={`rounded-full  px-5 py-2 font-semibold ${slot.status === "Active" ? "text-green-700 bg-green-100" : "text-orange-600 bg-orange-100"} `}
      >
        {slot.status}
      </span>
    </div>
  );
};

export default SlotDetailsPane;
