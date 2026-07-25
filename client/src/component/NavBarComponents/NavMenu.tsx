import { Link } from "react-router";

interface NavMenuProps {
  path: string;
  name: string;
  isActive: boolean;
}

const NavMenu = ({ path, name, isActive }: NavMenuProps) => {
  return (
    <Link
      to={path}
      className={`relative pb-2 text-lg  ${isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 font-medium"}`}
    >
      {name}
      {isActive && (
        <span className="absolute left-0 right-0 -bottom-1 h-1 rounded-full bg-blue-600"></span>
      )}
    </Link>
  );
};

export default NavMenu;
