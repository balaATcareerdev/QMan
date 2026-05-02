import type { LucideIcon } from "lucide-react";

interface BubbleDisplayMultiProps {
  header: string;
  subHeader?: string;
  value: number;
  type?: string;
  state?: string;
  Icon: LucideIcon;
  color: string;
}

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const BubbleDisplayMulti = ({
  header,
  subHeader,
  value,
  type,
  state,
  Icon,
  color,
}: BubbleDisplayMultiProps) => {
  return (
    <div className="grid grid-rows-2 bg-[#08051f]/70 p-5 rounded-sm border border-[#0c082a]">
      <div className="grid grid-cols-[70px_1fr] gap-2 items-center justify-center">
        <div
          className="p-3 rounded-full flex justify-center items-center"
          style={{ backgroundColor: hexToRgba(color, 0.2) }}
        >
          <Icon size={50} color={color} />
        </div>
        <div>
          <p className="text-2xl">{header}</p>
          {subHeader && <p className="text-sm text-gray-400">{subHeader}</p>}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-5xl flex items-end gap-1" style={{ color: color }}>
          {value}
          {type && <span className="text-3xl">{type}</span>}
        </p>

        {state && <p className="text-sm text-gray-300">{state}</p>}
      </div>
    </div>
  );
};

export default BubbleDisplayMulti;
