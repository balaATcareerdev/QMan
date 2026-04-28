import { useLocation } from "react-router";

const CustomerNavBar = () => {
  const location = useLocation();

  return (
    <nav className="absolute grid grid-cols-3 w-full pb-2 text-white border-b border-[#525252]">
      {/* Profile */}
      <div className="flex gap-5 justify-start items-center">
        {location.pathname !== "/cust/booked" && (
          <>
            <div>
              <div className="bg-[#C9A7E2] w-32 h-32 rounded-full flex justify-center items-center cursor-pointer">
                <p className="text-5xl">{"Balaji"[0]}</p>
              </div>
            </div>
            <div>
              <p className="text-lg">Balaji S</p>
              <p className="font-light text-sm text-[#AAAAAA]">
                balaji@example.com
              </p>
              <button className="bg-linear-to-r from-[#634579] to-[#847AAB] px-1 py-1 text-lg rounded-sm mt-5 hover:from-[#634579]/50 hover:to-[#847AAB]/50 transition-colors duration-300">
                Edit Profile
              </button>
            </div>
          </>
        )}
        {/* Photo Frame*/}
      </div>

      {/* Menu */}
      <div className="flex text-2xl justify-around items-start pt-5">
        <p className="cursor-pointer">Home</p>
        <p className="cursor-pointer">History</p>
        <p className="cursor-pointer">Notification</p>
      </div>

      {/* MT */}
      <div></div>
    </nav>
  );
};

export default CustomerNavBar;
