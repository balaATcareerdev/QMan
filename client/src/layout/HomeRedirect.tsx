import { useAuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router";

const HomeRedirect = () => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "Client") return <Navigate to="/client" replace />;
  if (user.role === "Customer") return <Navigate to="/cust" replace />;
  return <Navigate to="/unauthorized" replace />;
};

export default HomeRedirect;
