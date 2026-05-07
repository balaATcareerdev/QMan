import { user } from "@/assets/mockUser";
import { Bell, HistoryIcon, HomeIcon, UserPen } from "lucide-react";
import { Link, useLocation } from "react-router";

const CustomerNavBar = () => {
  const location = useLocation();
  const userData = user;

  return (
    <nav className="absolute grid grid-cols-3 w-full pb-2 text-white border-b border-[#525252] p-2 items-center justify-center">
      {/* Profile */}
      <div className="flex gap-5 justify-start items-center">
        <div className="flex gap-2 items-center">
          <div>
            <div className="bg-[#a78fd7] w-15 h-15 rounded-full flex justify-center items-center cursor-pointer">
              <p className="text-3xl">{userData.name[0]}</p>
            </div>
          </div>
          <div>
            <p className="text-lg">{userData.name}</p>
            <p className="font-light text-sm text-[#AAAAAA]">
              {userData.email}
            </p>
          </div>
          <button className="flex justify-center items-center px-1 py-2 rounded-md bg-gray-600/50 hover:bg-gray-600/70 cursor-pointer active:scale-105 transition duration-150 text-[`#b5b5b5`] gap-1">
            <UserPen color="#b5b5b5" />
            Edit Profile
          </button>
        </div>

        {/* Photo Frame*/}
      </div>

      {/* Menu */}
      <div className="flex text-2xl justify-around items-start">
        <div
          className={`flex justify-center px-1 py-2 items-center ${location.pathname === "/cust" ? "text-[#f46ea0] bg-[#f46ea0]/10  rounded-sm border-b border-[#f46ea0]" : ""}`}
        >
          <Link
            to={"/cust"}
            className="cursor-pointer flex items-center gap-1 justify-center"
          >
            <HomeIcon />
            Home
          </Link>
        </div>

        <div
          className={`flex justify-center px-1 py-2 items-center ${location.pathname === "/cust/booked" ? "text-[#f46ea0] bg-[#f46ea0]/10  rounded-sm border-b border-[#f46ea0]" : ""}`}
        >
          <Link
            to={"#"}
            className="cursor-pointer flex items-center gap-1 justify-center"
          >
            <HistoryIcon />
            History
          </Link>
        </div>

        <div
          className={`flex justify-center px-1 py-2 items-center ${location.pathname === "/cust/notification" ? "text-[#f46ea0] bg-[#f46ea0]/10  rounded-sm border-b border-[#f46ea0]" : ""}`}
        >
          <Link
            to={"#"}
            className="cursor-pointer flex items-center gap-1 justify-center relative"
          >
            <Bell />
            Notification
            <div className="absolute -top-2 -right-5 bg-[#f46ea0] rounded-full">
              <p className="w-5 h-5 flex items-center justify-center text-xs">
                3
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* MT */}
      <div></div>
    </nav>
  );
};

export default CustomerNavBar;
