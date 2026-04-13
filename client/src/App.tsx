import { Route, Routes } from "react-router";
import Home from "@/pages/Client/Home";
import PricingPage from "@/pages/Client/PricingPage";
import ServicePage from "@/pages/Client/ServicePage";
import SlotPage from "@/pages/Client/SlotPage";
import Booked from "@/pages/Customer/Booked";
import LoginPage from "@/pages/LoginPage";
import CustomerHome from "@/pages/Customer/CustomerHome";
import CustomerLayout from "@/layout/CustomerLayout";
import ClientLayout from "@/layout/ClientLayout";
import HomeRedirect from "@/layout/HomeRedirect";

const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<HomeRedirect />} />

        <Route path="/cust" element={<CustomerLayout />}>
          <Route index element={<CustomerHome />} />
          <Route path="booked" element={<Booked />} />
        </Route>

        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="service/:serviceId" element={<ServicePage />} />
          <Route path="slot/:slotId" element={<SlotPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
