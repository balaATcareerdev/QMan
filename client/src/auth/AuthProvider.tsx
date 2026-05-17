import type { AuthContextType, User } from "@/auth/auth.type";
import { userAuth } from "@/auth/userAuth";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Check the AuthProvided
  console.log("AuthProvider mounted");

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      const data = await userAuth();
      setUser(data);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
