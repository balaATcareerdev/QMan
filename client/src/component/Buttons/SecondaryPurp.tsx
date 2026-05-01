import { Settings } from "lucide-react";

const SecondaryPurp = ({ text }: { text: string }) => {
  return (
    <button className="border-[#9711FB] hover:bg-[#9000ff]/20 border text-white py-2.5 px-2.5 rounded-lg flex justify-center gap-2 items-center text-lg font-medium">
      <Settings />
      <span className="text-2xl font-normal">{text}</span>
    </button>
  );
};

export default SecondaryPurp;
