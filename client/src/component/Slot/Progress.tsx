const Progress = ({ progress }: { progress: number }) => {
  return (
    <div className="bg-[#003CFF]/10 border border-[#6C6C6C] rounded-sm flex justify-center py-10">
      <div className="w-3/4">
        <h1 className="font-light text-2xl mb-20">Progress</h1>

        <div className="flex flex-col justify-center items-center">
          <p className="font-light text-2xl pb-10">{progress}% Complete</p>

          <div className="w-full h-9 bg-[#535353]/50 rounded-xl relative mb-20 overflow-hidden">
            <div
              className="absolute bg-[#9711FB] h-full rounded-xl transition-all duration-1000 ease-in-out"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
