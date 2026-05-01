const PrimaryGradHome = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="px-2.5 py-1 bg-linear-to-r from-[#9711FB] to-[#FA73C4] hover:from-[#9711FB]/50 hover:to-[#FA73C4]/50 transition-colors duration-300 text-sm rounded-sm"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryGradHome;
