import { Route, Routes } from "react-router";
import Home from "@/pages/Client/Home";
import HomeRedirect from "@/layout/HomeRedirect";
import ClientLayout from "@/layout/ClientLayout";
import PricingPage from "@/pages/Client/PricingPage";
import LoginPage from "@/pages/LoginPage";
import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "@/api/auth.api";
import { AuthContext } from "@/context/AuthContext";
import ProtectRoute from "@/routes/ProtectRoute";
import PublicRoute from "@/routes/PublicRoute";

const App = () => {
  const { data: userData, isLoading: userDetailsLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getAuthUser,
    retry: false, // Disable retry on failure
  });

  if (userDetailsLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user: userData, isLoading: userDetailsLoading }}
    >
      <div className="relative">
        {/* <Routes>
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
      </Routes> */}
        <Routes>
          <Route path="/" element={<HomeRedirect />} />

          {/* public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Private Routes */}

          <Route element={<ProtectRoute />}>
            <Route path="/client" element={<ClientLayout />}>
              <Route index element={<Home />} />
              <Route path="pricing" element={<PricingPage />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
