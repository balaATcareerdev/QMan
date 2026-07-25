import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectRoute = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectRoute;
