import { loginBg } from "@/assets/export";
import { user } from "@/assets/mockUser";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CircleAlert,
  KeyRound,
  LoaderCircle,
  Mail,
  UserPen,
} from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const schema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  fname: z.string().optional(),
  lname: z.string().optional(),
});

type formField = z.infer<typeof schema>;

const LoginPage = () => {
  const [type, setType] = useState<"login" | "register">("login");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<formField>({
    shouldUnregister: true,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<formField> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // throw new Error("This Email is already in use");
      if (user.role === "Customer") {
        navigate("/cust");
      } else if (user.role === "Client") {
        navigate("/client");
      } else {
        navigate("/unauthorized");
      }
      console.log(data);
    } catch (error) {
      setError("root", { message: (error as Error).message });
    }
  };

  return (
    <div className="bg-linear-to-b from-black to-[#140B1B] min-h-screen text-white flex justify-center items-center">
      <div className="grid grid-cols-2 w-full max-w-6xl mx-auto bg-[#9711FB]/10 gap-5 rounded-xl overflow-hidden border border-[#29233f]">
        <div className="border-r border-[#29233f] h-full">
          <img
            src={loginBg}
            alt="Login Background"
            className="w-full h-full object-[center_left] object-cover"
          />
        </div>
        <div className="p-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl">Welcome back</h1>
            {type === "register" ? (
              <p className="text-gray-400 text-md">
                <span
                  onClick={() => setType("login")}
                  className="hover:underline cursor-pointer"
                >
                  Login
                </span>{" "}
                to continue to your account
              </p>
            ) : (
              <p className="text-gray-400 text-md">
                <span
                  onClick={() => setType("register")}
                  className="hover:underline cursor-pointer"
                >
                  Register
                </span>{" "}
                to create your account
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* first and lastname */}
            {type === "register" && (
              <div className="flex gap-5 mt-5">
                <div className="flex-1 border border-[#29233f]  flex  p-2 justify-between items-center rounded-sm relative">
                  <UserPen color="#9711FB" />
                  <input
                    type="text"
                    className="bg-none outline-none p-1 w-full"
                    placeholder="Enter First Name"
                    {...register("fname")}
                  />
                  {errors.fname && (
                    <div className="group">
                      <CircleAlert color="#c93626" className="cursor-pointer" />

                      <div className="absolute -right-10 -bottom-10  bg-[#c93626]/70 text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-100">
                        <p>{errors.fname.message}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 border border-[#29233f] flex p-2 justify-between items-center rounded-sm relative">
                  <UserPen color="#9711FB" />
                  <input
                    type="text"
                    className="bg-none outline-none p-1 w-full"
                    placeholder="Enter Last Name"
                    {...register("lname")}
                  />
                  {errors.lname && (
                    <div className="group">
                      <CircleAlert color="#c93626" className="cursor-pointer" />

                      <div className="absolute -right-10 -bottom-10  bg-[#c93626]/70 text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-100">
                        <p>{errors.lname.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col mt-10 gap-5">
              <div className="border border-[#29233f] flex p-2 justify-between items-center rounded-sm relative">
                <Mail color="#9711FB" />
                <input
                  type="email"
                  className="bg-none outline-none p-1 w-full pl-3"
                  placeholder="Enter Email"
                  {...register("email")}
                />

                {errors.email && (
                  <div className="group">
                    <CircleAlert color="#c93626" className="cursor-pointer" />

                    <div className="absolute -right-10 -bottom-10  bg-[#c93626]/70 text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-100">
                      <p>{errors.email.message}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-[#29233f] flex p-2 justify-between items-center rounded-sm relative ">
                <KeyRound color="#9711FB" />
                <input
                  type="password"
                  className="bg-none outline-none p-1 w-full pl-3"
                  placeholder="Enter Password"
                  {...register("password")}
                />

                {errors.password && (
                  <div className="group">
                    <CircleAlert color="#c93626" className="cursor-pointer" />

                    <div className="absolute -right-10 -bottom-10  bg-[#c93626]/70 text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-100">
                      <p>{errors.password.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-5 mb-5">
              <span className="text-[#FF1994] hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </div>

            <div className="flex justify-center items-center">
              <button className="text-lg bg-linear-to-r from-[#4B325E] to-[#FA73C4] hover:from-[#4B325E]/50 hover:to-[#FA73C4]/50 w-full p-3 rounded-sm transition-all duration-300 flex justify-center items-center gap-2">
                {type === "register" ? "Register" : "Login"}
                {isSubmitting && <LoaderCircle className="animate-spin" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
