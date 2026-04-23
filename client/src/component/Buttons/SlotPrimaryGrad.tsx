const SlotPrimaryGrad = ({ text }: { text: string }) => {
  return (
    <button className="bg-linear-to-r from-[#DDB0FF] hover:from-[#DDB0FF]/50 to-[#54588B] hover:to-[#54588B]/50 px-2.5 py-4 rounded-sm text-sm font-light transition-colors duration-300 ease-in-out">
      {text}
    </button>
  );
};

export default SlotPrimaryGrad;
