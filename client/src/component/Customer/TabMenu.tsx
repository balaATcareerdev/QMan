import type { LucideIcon } from "lucide-react";

const TabMenu = ({
  tabName,
  isActive,
  onClick,
  Icon,
  isSelected,
}: {
  tabName: string;
  isActive: boolean;
  onClick: () => void;
  Icon: LucideIcon;
  isSelected?: boolean;
}) => {
  return (
    <div
      className={`px-2 py-3 flex items-center gap-2 cursor-pointer ${isSelected ? "bg-[#fc76bd]/10 rounded-md border-l-4 border-[#FF1994] outline outline-[#ff66b8]/20" : ""}`}
    >
      <Icon color={isSelected ? "#FF1994" : "#FFFFFF"} />
      <p
        onClick={() => onClick()}
        className={`text-2xl ${!isActive ? "" : "text-[#FF1994]"} cursor-pointer hover:text-[#fb9dcf] transition-colors duration-300`}
      >
        {tabName}
      </p>
    </div>
  );
};

export default TabMenu;
