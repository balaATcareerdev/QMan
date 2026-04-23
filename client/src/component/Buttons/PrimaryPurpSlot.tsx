const PrimaryPurpSlot = ({ text }: { text: string }) => {
  return (
    <button className="font-light text-sm bg-linear-to-r hover:from-[#4B325E]/50 from-[#4B325E] to-[#858CEE] hover:to-[#858CEE]/50 px-2.5 py-1 rounded-sm transition-colors duration-300 ease-in-out">
      {text}
    </button>
  );
};

export default PrimaryPurpSlot;
