import type { LucideIcon } from "lucide-react";

const LiveStatus = ({
  Icon,
  header,
  value,
}: {
  Icon: LucideIcon;
  header: string;
  value: string | number;
}) => {
  return (
    <div className="flex justify-between text-sm">
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 bg-[#bc82f8]/10 flex justify-center items-center rounded-full p-1">
          <Icon size={15} />
        </div>
        {header}
      </div>
      <div>{value === "in_progress" ? "In Progress" : value}</div>
    </div>
  );
};

export default LiveStatus;
