import { Route, Routes } from "react-router";
import Home from "@/pages/Home";
import PricingPage from "@/pages/PricingPage";
import ServicePage from "@/pages/ServicePage";
import SlotPage from "@/pages/SlotPage";
import Booked from "@/pages/Booked";
import LoginPage from "@/pages/LoginPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/service/:serviceId" element={<ServicePage />} />
        <Route path="/slot/:slotId" element={<SlotPage />} />
        <Route path="/booked" element={<Booked />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
