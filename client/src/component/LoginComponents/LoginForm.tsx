import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, TriangleAlert } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/api/auth.api";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/util/errors";

const schema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormFields = z.infer<typeof schema>;

interface LoginFormProps {
  switchToRegister: () => void;
}

const LoginForm = ({ switchToRegister }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
      await login(data);
      // throw new Error();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const queryClient = useQueryClient();

  const { mutateAsync: login, isPending: isSubmitting } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Login successful!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  return (
    <div className="animate-in fade-in duration-300">
      {/* Heading */}

      <div>
        <h2 className="text-5xl font-bold text-slate-900">Welcome back!</h2>

        <p className="mt-3 text-xl text-slate-500">
          Login to your account to continue
        </p>
      </div>

      {/* Form */}

      <form className="mt-10 space-y-7" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}

        <div>
          <label className="mb-3 block text-lg font-semibold text-slate-700">
            Email
          </label>

          <div
            className={`flex h-16 items-center rounded-xl border ${errors.email ? "border-red-400" : ""} px-4`}
          >
            <Mail className="mr-4 h-5 w-5 text-slate-500" />

            <input
              {...register("email")}
              type="text"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-lg outline-none"
            />

            {errors.email && <TriangleAlert className="h-5 w-5 text-red-500" />}
          </div>

          {errors.email && (
            <p className="mt-2 text-base text-red-500">
              {errors.email.message || "Valid Email is required."}
            </p>
          )}
        </div>

        {/* Password */}

        <div>
          <label className="mb-3 block text-lg font-semibold text-slate-700">
            Password
          </label>

          <div
            className={`flex h-16 items-center rounded-xl border ${errors.password ? "border-red-400" : ""} px-4`}
          >
            <Lock className="mr-4 h-5 w-5 text-slate-500" />

            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="flex-1 bg-transparent text-lg outline-none"
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-slate-500" />
              ) : (
                <Eye className="h-5 w-5 text-slate-500" />
              )}
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between">
            {errors.password && (
              <p className="text-base text-red-500">
                {errors.password.message || "Valid Password is required."}
              </p>
            )}

            <button
              type="button"
              className="text-base font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Login */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 h-16 w-full rounded-xl bg-blue-600 text-xl font-semibold text-white transition hover:bg-blue-700"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}

        <div className="relative py-2">
          <div className="border-t border-slate-200" />

          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-slate-500">
            or
          </span>
        </div>

        {/* Switch */}

        <p className="text-center text-lg text-slate-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={switchToRegister}
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
