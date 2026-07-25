import ProfileMenu from "@/component/NavBarComponents/ProfileMenu";
import { User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NavProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={profileRef} className="relative flex items-center gap-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
      >
        <User className="h-7 w-7 text-gray-600" />
      </button>

      {isOpen && <ProfileMenu />}
    </div>
  );
};

export default NavProfile;
