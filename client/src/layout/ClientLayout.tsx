import NavBar from "@/component/Common/NavBar";
import { Outlet } from "react-router";

const ClientLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default ClientLayout;
