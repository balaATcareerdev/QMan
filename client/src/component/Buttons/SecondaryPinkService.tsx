import { Pause, Play, type LucideIcon } from "lucide-react";

const SecondaryPinkService = ({
  text,
  Icon,
}: {
  text: string;
  Icon?: LucideIcon;
}) => {
  return (
    <button
      type="button"
      className="border-[#FF3DDB] border-2 text-lg  text-white rounded-sm flex justify-center items-center hover:bg-[#FF3DDB]/10 transition-colors duration-300 px-5 py-2 gap-2"
    >
      {text === "Pause" ? (
        <Pause size={15} />
      ) : text === "Resume" ? (
        <Play size={15} />
      ) : (
        Icon && <Icon />
      )}
      {text}
    </button>
  );
};

export default SecondaryPinkService;
