const TabMenu = ({
  tabName,
  isActive,
  onClick,
}: {
  tabName: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="p-2">
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
