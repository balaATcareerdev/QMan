interface ServiceList {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ServiceList = ({ onClick }: ServiceList) => {
  return (
    <div className="grid grid-cols-4 p-5 py-2.5 bg-[#ECA0C9]/20 hover:outline rounded-sm hover:outline-[#FF1994] transition-all duration-300">
      <div>
        <h1 className="text-lg">Library</h1>
        <p className="text-sm text-[#A09999]">11-4-2026</p>
      </div>

      <div>
        <p className="text-sm">4 Slots Available</p>
      </div>

      <div>
        <p className="text-sm">20 More Bookings Left</p>
      </div>

      <div className="flex justify-center items-center text-sm">
        <button
          onClick={(e) => onClick(e)}
          className="bg-linear-to-r from-[#BC6B96] hover:from-[#BC6B96]/50 to-[#737F97] hover:to-[#737F97]/50 px-2.5 py-1 rounded-sm"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ServiceList;
