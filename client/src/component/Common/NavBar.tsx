import { useState } from "react";
import { Link } from "react-router";

const NavBar = () => {
  const [name] = useState("Balaji S");

  return (
    <nav className="absolute z-30 w-full flex p-2">
      <div className="w-1/3"></div>
      <div className="text-white w-1/3 text-xl flex justify-center items-center gap-6">
        <Link to="/">Home</Link>
        <Link to={"#"}>Dashboard</Link>
        <Link to={"#"}>History</Link>
        <Link to={"/client/pricing"}>Pricing</Link>
      </div>

      <div className="flex w-1/3 text-white items-center gap-5 justify-end select-none pr-3">
        <div className="w-10 h-10 bg-[#9711FB] text-center flex justify-center flex-col rounded-full">
          {name[0]}
        </div>
        <span className="text-lg">{name}</span>
        <span className="text-lg">Notifications</span>
      </div>
    </nav>
  );
};

export default NavBar;
