import { getActiveServices } from "@/api/service.api";

import ActiveServiceCard from "@/component/HomeComponents/ActiveServiceCard";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";

const ActiveServiceSection = () => {
  // const [services, setServices] = useState(dummyActiveServices);

  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activeServices"],
    queryFn: getActiveServices,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (isError || !services) {
    return (
      <div className="px-7 py-10 lg:px-10">
        <p className="text-lg font-semibold text-red-600">
          Unable to load today's services
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-8 px-7 py-10 lg:px-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-slate-900">
            Today's Services
          </h2>

          <p className="mt-2 text-xl text-slate-500">
            Services and their slots for today
          </p>
        </div>

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 text-lg font-semibold shadow-sm hover:bg-slate-50">
          View All
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Cards */}
      {services.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <ActiveServiceCard
              key={service.id}
              serviceName={service.serviceName}
              description={service.description}
              scheduledDate={service.date}
              slots={service.slots}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-10 items-center justify-center rounded-3xl border border-slate-200 bg-orange-200 text-xl font-semibold text-slate-800 shadow-sm">
          No services scheduled for today
        </div>
      )}
    </section>
  );
};

export default ActiveServiceSection;
