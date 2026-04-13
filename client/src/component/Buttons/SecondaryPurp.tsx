const SecondaryPurp = ({ text }: { text: string }) => {
  return (
    <button className="border-[#9711FB] hover:bg-[#9000ff]/20 border text-white py-2.5 px-2.5 rounded-lg">
      {text}
    </button>
  );
};

export default SecondaryPurp;
