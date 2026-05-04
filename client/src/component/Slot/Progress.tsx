import CircularProgress from "@/component/Slot/CircularRadial";
import { Info } from "lucide-react";

const Progress = ({
  progress,
  completed,
  total,
}: {
  progress: number;
  completed: number;
  total: number;
}) => {
  return (
    <div className="p-10 bg-[#9711FB]/10 flex flex-col gap-4 justify-center rounded-2xl border border-[#2a1652]">
      <h1 className="text-2xl">Progress</h1>
      <section>
        <CircularProgress value={progress} />
      </section>
      <hr className="border border-[#2a1652]" />
      <div className="flex flex-col justify-center items-center">
        <p className="font-thin text-gray-300">
          {completed} of {total} completed
        </p>

        <div className="flex gap-1 px-2 py-3 bg-[#9f71fb]/5 rounded-sm border border-[#2a1652] mt-4">
          <Info color="#9f71fb" />
          <p className="text-[#9f71fb]">Keep going! You're doing great!</p>
        </div>
      </div>
    </div>
  );
};

export default Progress;
