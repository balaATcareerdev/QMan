import { Navigate } from "react-router";

const HomeRedirect = () => {
  const user = {
    role: "client",
  };

  if (!user) return <Navigate to="/login" />;

  if (user.role === "client") return <Navigate to="/client" />;
  return <Navigate to="/cust" />;
};

export default HomeRedirect;
