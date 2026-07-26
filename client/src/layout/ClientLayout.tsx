import NavBar from "@/component/Common/NavBar";
import Footer from "@/component/Footer/Footer";
import { Outlet } from "react-router";

const ClientLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
