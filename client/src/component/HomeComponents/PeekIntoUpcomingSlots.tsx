import { getAllActiveSlotsQuick } from "@/api/slot.api";
import UpcomingSlotCard from "@/component/HomeComponents/UpcomingSlotCard";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";

const PeekIntoUpcomingSlots = () => {
  // const [slots, setSlots] = useState(peekIntoUpcomingSlots);

  const { data: slots, isLoading } = useQuery({
    queryKey: ["upcomingSlotsPeek"],
    queryFn: getAllActiveSlotsQuick,
  });

  if (slots) {
    console.log("Upcoming Slots:", slots);
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!slots) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg font-semibold">Unable to fetch upcoming slots</p>
      </div>
    );
  }

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

      {slots.length > 0 ? (
        <div className="space-y-5">
          {slots.map((slot) => (
            <UpcomingSlotCard
              bookedCount={slot.bookedCount}
              startTime={slot.startTime}
              key={slot.id}
              serviceName={slot.serviceName}
              slotName={slot.slotName}
              scheduledDate={slot.scheduledDate}
              serviceDescription={slot.serviceDescription}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-10 items-center justify-center rounded-3xl border border-slate-200 bg-orange-200 text-xl font-semibold text-slate-800 shadow-sm">
          No upcoming slots found
        </div>
      )}
    </section>
  );
};

export default PeekIntoUpcomingSlots;
