import { type LucideIcon } from "lucide-react";

const BubbleDisplay = ({
  head,
  value,
  desc,
  Icon,
}: {
  head: string;
  value: string;
  desc: string;
  Icon: LucideIcon;
}) => {
  return (
    <div className="grid grid-cols-[100px_300px] border border-[#F6A1CF]/20 bg-[#F6A1CF]/2 justify-center items-center p-5 rounded-3xl gap-5">
      <div className="flex justify-center items-center">
        <div className="bg-[#F6A1CF]/10 p-5 rounded-4xl">
          <Icon size={50} />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-2">
        <p className="text-2xl font-semibold">{head}</p>
        <p className="text-4xl font-bold text-[#F6A1CF]">{value}</p>
        <p className="text-xl font-light text-gray-300">{desc}</p>
      </div>
    </div>
  );
};

export default BubbleDisplay;
