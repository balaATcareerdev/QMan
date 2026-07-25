import type { LucideIcon } from "lucide-react";

interface ProfileMenuItemProps {
  icon: LucideIcon;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}

const ProfileMenuItem = ({
  icon: Icon,
  label,
  danger = false,
  onClick,
}: ProfileMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 px-7 py-5 text-left transition hover:bg-slate-50 ${
        danger ? "text-red-600" : "text-slate-700"
      }`}
    >
      <Icon className="h-6 w-6" />

      <span className="text-xl font-medium">{label}</span>
    </button>
  );
};

export default ProfileMenuItem;
