import { user } from "@/assets/mockUser";
import { Navigate, Outlet } from "react-router";

type Props = {
  allowedRole: "Customer" | "Client";
};

const ProtectedRoute = ({ allowedRole }: Props) => {
  if (user.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
