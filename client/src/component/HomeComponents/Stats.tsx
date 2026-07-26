import { getServiceStats } from "@/api/service.api";
import StatsCard from "@/component/HomeComponents/StatsCard";
import { formatNumber } from "@/util/valueFormatUtils";
import { useQuery } from "@tanstack/react-query";
import { Layers, Play, UserRound } from "lucide-react";

const Stats = () => {
  const { data: stats, isLoading } = useQuery({
    queryFn: getServiceStats,
    queryKey: ["serviceStats"],
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-7">
      <StatsCard
        title="Today's Services"
        value={formatNumber(stats.activeServices) || 0}
        description="Total services scheduled"
        icon={Layers}
        iconBg="bg-blue-100"
        iconColor="text-blue-500"
      />
      <StatsCard
        title="Running slots"
        value={formatNumber(stats.activeSlots) || 0}
        description="Currently runnning"
        icon={Play}
        iconBg="bg-green-100"
        iconColor="text-green-500"
      />
      <StatsCard
        title="Customer waiting"
        value={formatNumber(stats.customerWaiting) || 0}
        description="Across all queues"
        icon={UserRound}
        iconBg="bg-orange-100"
        iconColor="text-orange-500"
      />
    </div>
  );
};

export default Stats;
