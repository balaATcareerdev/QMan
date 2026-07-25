import { dummyActiveServices } from "@/assets/dummyData";
import ActiveServiceCard from "@/component/HomeComponents/ActiveServiceCard";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const ActiveServiceSection = () => {
  const [services, setServices] = useState(dummyActiveServices);

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
      <div className="grid gap-6 lg:grid-cols-3">
        {services.map((service, index) => (
          <ActiveServiceCard
            key={index}
            serviceName={service.serviceName}
            description={service.description}
            scheduledDate={service.scheduledDate}
            slots={service.slots}
          />
        ))}
      </div>
    </section>
  );
};

export default ActiveServiceSection;
