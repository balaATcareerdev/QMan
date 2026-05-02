import { type LucideIcon } from "lucide-react";

const PrimaryPinkService = ({
  text,
  onClick,
  Icon,
}: {
  text: string;
  onClick?: () => void;
  Icon: LucideIcon;
}) => {
  return (
    <button
      className="font-medium text-lg px-5 py-2 rounded-sm bg-linear-to-r from-[#FA73C4] to-[#86072F] text-white flex justify-center items-center hover:from-[#FA73C4]/30 hover:to-[#86072F]/30 transition-colors duration-300 gap-2"
      onClick={onClick}
    >
      <Icon size={15} />
      {text}
    </button>
  );
};

export default PrimaryPinkService;
