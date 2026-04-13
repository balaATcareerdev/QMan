import CustomerNavBar from "@/component/Common/CustomerNavBar";
import { Outlet } from "react-router";

const CustomerLayout = () => {
  return (
    <>
      <CustomerNavBar />
      <Outlet />
    </>
  );
};

export default CustomerLayout;
