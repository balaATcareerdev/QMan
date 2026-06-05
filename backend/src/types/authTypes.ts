export type RegisterBody = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: "Customer" | "Client";
};

export type LoginBody = {
  email: string;
  password: string;
};
