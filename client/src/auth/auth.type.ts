export type User = {
  id: string;
  email: string;
  role: "Customer" | "Client";
  fname: string;
  lname: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
};
