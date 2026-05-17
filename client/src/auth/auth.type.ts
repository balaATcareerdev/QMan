export type User = {
  id: string;
  name: string;
  email: string;
  role: "Customer" | "Client";
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
};
