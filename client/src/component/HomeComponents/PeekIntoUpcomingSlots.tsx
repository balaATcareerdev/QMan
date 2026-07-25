import { peekIntoUpcomingSlots } from "@/assets/dummyData";
import UpcomingSlotCard from "@/component/HomeComponents/UpcomingSlotCard";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const PeekIntoUpcomingSlots = () => {
  const [slots, setSlots] = useState(peekIntoUpcomingSlots);

  return (
    <section className="space-y-8 px-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-slate-900">Upcoming Slots</h2>

          <p className="mt-2 text-xl text-slate-500">
            Slots that will start later today
          </p>
        </div>

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 text-lg font-semibold shadow-sm transition hover:bg-slate-50">
          View All
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Cards */}

      <div className="space-y-5">
        {slots.map((slot, index) => (
          <UpcomingSlotCard
            bookedCount={slot.bookedCount}
            startTime={slot.startTime}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default PeekIntoUpcomingSlots;
