const SecondaryPinkService = ({ text }: { text: string }) => {
  return (
    <button className="border-[#FF3DDB] border-2 w-20 h-5 text-white rounded-sm text-[10px] flex justify-center items-center hover:bg-[#FF3DDB]/10 transition-colors duration-300">
      {text}
    </button>
  );
};

export default SecondaryPinkService;
