import { getUpcomingServices } from "@/api/service.api";
import UpcomingServiceCard from "@/component/HomeComponents/UpcomingServiceCard";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";

const UpcomingServiceSection = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["upcomingServices"],
    queryFn: getUpcomingServices,
  });

  if (!services) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg font-semibold">No services found</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }
  return (
    <section className="space-y-8 px-7 py-10 lg:px-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-slate-900">
            Upcoming Services
          </h2>

          <p className="mt-2 text-xl text-slate-500">
            Services and their slots in future
          </p>
        </div>

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 text-lg font-semibold shadow-sm hover:bg-slate-50">
          View All
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {services.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <UpcomingServiceCard
              key={service.id}
              id={service.id}
              serviceName={service.serviceName}
              description={service.description}
              scheduledDate={service.date}
              slots={service.slots}
            />
          ))}
        </div>
      ) : (
        <div>
          <div className="flex h-10 items-center justify-center rounded-3xl border border-slate-200 bg-orange-200 text-xl font-semibold text-slate-800 shadow-sm">
            No upcoming services found
          </div>
        </div>
      )}

      {/* Cards */}
    </section>
  );
};

export default UpcomingServiceSection;
