import { user } from "@/assets/mockUser";
import { userLogout } from "@/auth/userAuth";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useMutation } from "@tanstack/react-query";
import {
  BadgeIndianRupee,
  Bell,
  History,
  House,
  LayoutDashboard,
  LogOut,
  UserPen,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

const NavBar = () => {
  const userData = user;
  const location = useLocation();
  const { refreshAuth } = useAuthContext();
  const navigate = useNavigate();

  const { mutateAsync: doLogout, isPending: isLoggingOut } = useMutation({
    mutationFn: userLogout,
    onSuccess: async () => {
      try {
        await refreshAuth();
      } finally {
        navigate("/login");
      }
    },
  });

  const onLogout = async () => {
    try {
      await doLogout();
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <nav className="absolute z-30 w-full flex p-2 text-white bg-black/50 border-b border-gray-800">
      <div className="w-1/3">
        <div className="flex justify-start items-center gap-2">
          <div className="flex flex-col">
            <span className="text-lg">{userData.name}</span>
            <span className="text-sm text-gray-400">{userData.email}</span>
          </div>

          <button className="flex justify-center items-center px-1 py-2 rounded-md bg-gray-600/50 hover:bg-gray-600/70 cursor-pointer active:scale-105 transition duration-150 text-[`#b5b5b5`] gap-1">
            <UserPen size={16} color="#b5b5b5" />
            Edit Profile
          </button>

          <button
            className="flex justify-center items-center px-1 py-2 rounded-md bg-gray-600/50 hover:bg-gray-600/70 cursor-pointer active:scale-105 transition duration-150 text-[`#b5b5b5`] gap-1"
            onClick={onLogout}
            disabled={isLoggingOut}
          >
            <LogOut size={16} color="#b5b5b5" />
            Logout
          </button>
        </div>
      </div>
      <div className="w-1/3 text-xl flex justify-center items-center gap-6">
        <div className="grid grid-rows-[50px_1fr] gap-1">
          <Link
            to="/client"
            className={`flex gap-2 justify-center items-center ${location.pathname === "/client" ? "text-[#9711FB]" : ""}`}
          >
            <House size={20} />
            <span className="text-md">Home</span>
          </Link>
          {location.pathname === "/client" && (
            <div className="flex justify-evenly items-end">
              <hr className="border border-[#9711FB] w-full" />
            </div>
          )}
        </div>

        <div className="grid grid-rows-[50px_1fr] gap-1">
          <Link
            to="#"
            className={`flex gap-2 justify-center items-center ${location.pathname === "/dashboard" ? "text-[#9711FB]" : ""}`}
          >
            <LayoutDashboard size={20} />
            <span className="text-md">Dashboard</span>
          </Link>

          {location.pathname === "/dashboard" && (
            <div className="flex justify-evenly items-end">
              <hr className="border border-[#9711FB] w-full" />
            </div>
          )}
        </div>

        <div className="grid grid-rows-[50px_1fr] gap-1">
          <Link
            to="#"
            className={`flex gap-2 justify-center items-center ${location.pathname === "/client/history" ? "text-[#9711FB]" : ""}`}
          >
            <History size={20} />
            <span className="text-md">History</span>
          </Link>

          {location.pathname === "/client/history" && (
            <div className="flex justify-evenly items-end">
              <hr className="border border-[#9711FB] w-full" />
            </div>
          )}
        </div>

        <div className="grid grid-rows-[50px_1fr] gap-1">
          <Link
            to="/client/pricing"
            className={`flex gap-2 justify-center items-center ${location.pathname === "/client/pricing" ? "text-[#9711FB]" : ""}`}
          >
            <BadgeIndianRupee size={20} />
            <span className="text-md">Pricing</span>
          </Link>

          {location.pathname === "/client/pricing" && (
            <div className="flex justify-evenly items-end">
              <hr className="border border-[#9711FB] w-full" />
            </div>
          )}
        </div>
      </div>

      <div className="flex w-1/3 items-center gap-5 justify-end select-none pr-3">
        <div className="relative hover:bg-gray-500/30 p-2 rounded-full transition-color duration-300 ease-in-out cursor-pointer">
          <Bell />
          <p className="absolute -top-1 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </p>
        </div>
        <div className="w-10 h-10 bg-[#9711FB] text-center flex justify-center flex-col rounded-full">
          {userData.name[0]}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
