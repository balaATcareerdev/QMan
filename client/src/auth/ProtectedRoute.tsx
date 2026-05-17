import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate, Outlet } from "react-router";

type Props = {
  allowedRole: "Customer" | "Client";
};

const ProtectedRoute = ({ allowedRole }: Props) => {
  console.log("ProtectedRoute:", {
    allowedRole,
  });

  const { user: UserData, isAuthenticated } = useAuthContext();

  if (!isAuthenticated || !UserData) {
    return <Navigate to="/login" replace />;
  }

  if (UserData.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
