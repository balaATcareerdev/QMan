import StatsCard from "@/component/HomeComponents/StatsCard";
import { Layers, Play, UserRound } from "lucide-react";

const Stats = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-7">
      <StatsCard
        title="Today's Services"
        value={3}
        description="Total services scheduled"
        icon={Layers}
        iconBg="bg-blue-100"
        iconColor="text-blue-500"
      />
      <StatsCard
        title="Running slots"
        value={5}
        description="Currently runnning"
        icon={Play}
        iconBg="bg-green-100"
        iconColor="text-green-500"
      />
      <StatsCard
        title="Customer waiting"
        value={28}
        description="Across all queues"
        icon={UserRound}
        iconBg="bg-orange-100"
        iconColor="text-orange-500"
      />
    </div>
  );
};

export default Stats;
