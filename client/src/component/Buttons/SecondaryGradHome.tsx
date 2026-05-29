import { LoaderCircle } from "lucide-react";

const SecondaryGradHome = ({
  text,
  onClick,
  isPending,
}: {
  text: string;
  onClick?: () => void;
  isPending: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className="px-2.5 py-1 border border-[#A75581] rounded-sm transition-colors duration-300 hover:bg-[#A75581]/30 flex justify-center items-center gap-1 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-gray-500/30 disabled:text-gray-500/50
    "
    >
      {text}
      {isPending && (
        <LoaderCircle size={15} color="white" className="animate-spin" />
      )}
    </button>
  );
};

export default SecondaryGradHome;
