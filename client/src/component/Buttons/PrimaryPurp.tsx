import { Plus } from "lucide-react";

const PrimaryPurp = ({
  text,
  setOpenCreate,
}: {
  text: string;
  setOpenCreate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      type="button"
      className="bg-linear-to-r from-[#9711FB] to-[#FA73C4] flex justify-center items-center p-2.5 rounded-lg hover:from-[#9711FB]/50 hover:to-[#FA73C4]/50 transition-colors duration-300"
      onClick={() => setOpenCreate(true)}
    >
      <Plus />
      <span className="text-2xl font-normal">{text}</span>
    </button>
  );
};

export default PrimaryPurp;
