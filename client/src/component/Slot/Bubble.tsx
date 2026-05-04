import { hexToRgba } from "@/util/slotUtils";
import type { LucideIcon } from "lucide-react";

const Bubble = ({
  Icon,
  header,
  value,
  type,
  subHeader,
  color,
}: {
  Icon: LucideIcon;
  header: string;
  value: number;
  type?: string;
  subHeader?: string;
  color: string;
}) => {
  return (
    <div className="grid grid-cols-2 bg-[#9f71fb]/10 p-4 rounded-sm border border-[#1e0c42]">
      <div>
        <div
          style={{ backgroundColor: hexToRgba(color, 0.1) }}
          className="w-20 h-20 rounded-full flex items-center justify-center"
        >
          <Icon size={40} color={color} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center px-1">
        <p className="text-sm">{header}</p>
        <span className="text-2xl font-bold">
          {value}
          {type && (
            <span
              style={{
                color: color,
              }}
              className="text-lg font-normal"
            >
              {type}
            </span>
          )}
        </span>
        {subHeader && (
          <span className="text-sm font-thin text-gray-300">{subHeader}</span>
        )}
      </div>
    </div>
  );
};

export default Bubble;
