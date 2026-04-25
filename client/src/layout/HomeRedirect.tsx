import { user } from "@/assets/mockUser";
import { Navigate } from "react-router";

const HomeRedirect = () => {
  if (!user) return <Navigate to="/login" />;

  if (user.role === "client") return <Navigate to="/client" />;
  return <Navigate to="/cust" />;
};

export default HomeRedirect;
