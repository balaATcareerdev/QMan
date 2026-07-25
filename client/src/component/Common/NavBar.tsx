import NavLogo from "@/component/NavBarComponents/NavLogo";
import NavMenu from "@/component/NavBarComponents/NavMenu";
import NavProfile from "@/component/NavBarComponents/NavProfile";
import { useAuthContext } from "@/context/AuthContext";
import { useLocation } from "react-router";

const NavBar = () => {
  const location = useLocation();

  const { user: userData } = useAuthContext();

  if (!userData) return null;

  return (
    <nav className="w-full rounded-2xl border border-gray-200 bg-white px-8 py-5 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <NavLogo />

        {/* Navigation */}
        <div className="flex items-center gap-16">
          <NavMenu
            path="/client"
            name="Home"
            isActive={location.pathname === "/client"}
          />

          <NavMenu
            path="#"
            name="History"
            isActive={location.pathname === "/history"}
          />

          <NavMenu
            path="/client/pricing"
            name="Pricing"
            isActive={location.pathname === "/client/pricing"}
          />
        </div>

        {/* Profile */}
        <NavProfile />
      </div>
    </nav>
  );
};

export default NavBar;
