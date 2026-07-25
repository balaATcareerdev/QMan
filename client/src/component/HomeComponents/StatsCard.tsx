import { ChevronRight, type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconBg,
  iconColor,
}: StatsCardProps) => {
  return (
    <div className="flex h-52.5 items-center justify-between rounded-3xl border border-slate-200 bg-white px-8 py-7 transition-all hover:shadow-sm">
      <div className="flex items-center gap-8">
        {/* Icon */}
        <div
          className={`flex h-28 w-28 items-center justify-center rounded-[30px] ${iconBg}`}
        >
          <Icon className={`h-11 w-11 ${iconColor}`} />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="text-[20px] font-semibold text-slate-800">{title}</h3>

          <p className="leading-none text-[56px] font-bold text-slate-950">
            {value}
          </p>

          <p className="text-[18px] font-medium text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <ChevronRight className="h-7 w-7 text-slate-400" />
    </div>
  );
};

export default StatsCard;
