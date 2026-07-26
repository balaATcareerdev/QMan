import { logoutUser } from "@/api/auth.api";
import ProfileMenuItem from "@/component/NavBarComponents/ProfileMenuIcon";
import { useAuthContext } from "@/context/AuthContext";
import { getApiErrorMessage } from "@/util/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ProfileMenu = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      toast.success("Logged out successfully");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  const onLogoutHandler = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <div className="w-90 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl absolute right-0 top-15">
      {/* User */}

      <div className="flex items-center gap-5 p-7">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-4xl font-semibold text-slate-800">
          {user.fname.charAt(0)}
        </div>

        <div>
          <h3 className="text-[34px] font-bold text-slate-900 line-clamp-1">
            {user.fname} {user.lname}
          </h3>

          <p className="mt-1 text-xl text-slate-500 line-clamp-1">
            {user.email}
          </p>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Menu */}

      <div className="py-3">
        <ProfileMenuItem
          onClick={onLogoutHandler}
          icon={LogOut}
          label="Logout"
          danger
        />
      </div>
    </div>
  );
};

export default ProfileMenu;
