const PrimaryGradHome = ({ text, onClick }: { text: string, onClick: () => void }) => {
  return (
    <button
      className="px-2.5 py-1 bg-linear-to-r from-[#A07FB9] to-[#A75581] rounded-sm
    hover:from-[#A07FB9]/30 hover:to-[#A75581]/30 transition-colors duration-300
    "
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryGradHome;
