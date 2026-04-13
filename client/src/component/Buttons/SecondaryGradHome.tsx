const SecondaryGradHome = ({ text }: { text: string }) => {
  return (
    <button
      className="px-2.5 py-1 border border-[#A75581] rounded-sm transition-colors duration-300 hover:bg-[#A75581]/30
    "
    >
      {text}
    </button>
  );
};

export default SecondaryGradHome;
