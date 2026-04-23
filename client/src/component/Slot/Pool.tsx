const Pool = ({ n, status }: { n: number; status: string }) => {
  return (
    <div
      className={`px-5 h-12 py-2 flex justify-center items-center ${status === "completed" ? "bg-[#00FF0D]/10" : status === "in_progress" ? " bg-[#9711FB]/15 border border-[#9711FB] h-20" : "bg-[#A35ED7]/15 border border-[#2D2D2D]"} rounded-sm border border-[#00FF1E] transition-all duration-300 ease-in-out`}
    >
      <p className="text-2xl font-light">#{n}</p>
    </div>
  );
};

export default Pool;
