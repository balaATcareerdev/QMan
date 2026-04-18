const PrimaryPinkService = ({ text }: { text: string }) => {
  return (
    <button className="font-medium text-[10px] px-2.5 py-1 rounded-sm bg-linear-to-r from-[#FA73C4] to-[#86072F] text-white w-20 h-5 flex justify-center items-center hover:from-[#FA73C4]/30 hover:to-[#86072F]/30 transition-colors duration-300">
      {text}
    </button>
  );
};

export default PrimaryPinkService;
