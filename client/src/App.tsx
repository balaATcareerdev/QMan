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
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/component/ProtectRoute/ProtectedRoute";
import UnAuthorized from "@/pages/UnAuthorized";

const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<HomeRedirect />} />

        <Route element={<ProtectedRoute allowedRole="Customer" />}>
          <Route path="/cust" element={<CustomerLayout />}>
            <Route index element={<CustomerHome />} />
            <Route path="booked" element={<Booked />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="Client" />}>
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="service/:serviceId" element={<ServicePage />} />
            <Route path="slot/:slotId" element={<SlotPage />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
