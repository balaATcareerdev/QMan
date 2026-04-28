const ColumnElem = () => {
  return (
    <div className="bg-[#9F81D0]/10 p-5 rounded-lg">
      <h1 className="text-2xl text-[#FFA4E5]">Lunch</h1>
      <div className="flex items-end gap-2">
        <p className="text-lg font-semibold">Non-Veg</p>
        <span className="text-sm text-[#AEAEAE]">12:00-12:30</span>
      </div>
      <div>
        <p className="text-[#FF7700]">Your Turn in 10min</p>
      </div>

      <div className="flex justify-center items-center mt-5">
        <button className="bg-linear-to-r from-[#FA73C4] to-[#86072F] text-sm px-2.5 p-1 rounded-sm hover:from-[#FA73C4]/50 hover:to-[#86072F]/50 transition-all duration-300">
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default ColumnElem;
