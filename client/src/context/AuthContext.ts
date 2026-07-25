import { createContext, useContext } from "react";

export interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  role: "Customer" | "Client";
}

interface AuthContextType {
  user: User | null;
  //   setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
