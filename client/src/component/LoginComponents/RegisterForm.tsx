import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  TriangleAlert,
} from "lucide-react";

import { z } from "zod";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/api/auth.api";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/util/errors";

const schema = z
  .object({
    fName: z.string().min(1, { message: "Full name is required" }),
    lName: z.string().min(1, { message: "Last name is required" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" }),
    role: z.enum(["Customer", "Client"], {
      message: "Role must be either Customer or Client",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

interface RegisterFormProps {
  switchToLogin: () => void;
}

const RegisterForm = ({ switchToLogin }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Demo error states (replace with react-hook-form later)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      role: "Client",
    },
    resolver: zodResolver(schema),
  });

  const role = useWatch({
    control,
    name: "role",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await registerUser({
        fname: data.fName,
        lname: data.lName,
        email: data.email,
        password: data.password,
        role: data.role,
      });
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  const queryClient = useQueryClient();

  const { mutateAsync: registerUser } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      toast.success("Registration successful!");
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
        <h2 className="text-5xl font-bold text-slate-900">Create Account</h2>

        <p className="mt-3 text-xl text-slate-500">
          Join Qman and start managing queues efficiently.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-7">
        {/* First Name */}

        <div>
          <label className="mb-3 block text-lg font-semibold text-slate-700">
            First Name
          </label>

          <div
            className={`flex h-16 items-center rounded-xl border px-4 ${
              errors.fName ? "border-red-400" : "border-slate-300"
            }`}
          >
            <User className="mr-4 h-5 w-5 text-slate-500" />

            <input
              {...register("fName")}
              placeholder="Enter your full name"
              className="flex-1 bg-transparent text-lg outline-none"
            />

            {errors.fName && <TriangleAlert className="h-5 w-5 text-red-500" />}
          </div>

          {errors.fName && (
            <p className="mt-2 text-base text-red-500">
              Full name is required.
            </p>
          )}
        </div>

        {/* Last Name */}

        <div>
          <label className="mb-3 block text-lg font-semibold text-slate-700">
            Last Name
          </label>

          <div
            className={`flex h-16 items-center rounded-xl border px-4 ${
              errors.lName ? "border-red-400" : "border-slate-300"
            }`}
          >
            <User className="mr-4 h-5 w-5 text-slate-500" />

            <input
              {...register("lName")}
              placeholder="Last Name"
              className="flex-1 bg-transparent text-lg outline-none"
            />

            {errors.lName && <TriangleAlert className="h-5 w-5 text-red-500" />}
          </div>

          {errors.lName && (
            <p className="mt-2 text-base text-red-500">
              {errors.lName.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="mb-3 block text-lg font-semibold text-slate-700">
            Email
          </label>

          <div
            className={`flex h-16 items-center rounded-xl border px-4 ${
              errors.email ? "border-red-400" : "border-slate-300"
            }`}
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
            className={`flex h-16 items-center rounded-xl border px-4 ${
              errors.password ? "border-red-400" : "border-slate-300"
            }`}
          >
            <Lock className="mr-4 h-5 w-5 text-slate-500" />

            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              className="flex-1 bg-transparent text-lg outline-none"
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

          {errors.password && (
            <p className="mt-2 text-base text-red-500">
              {errors.password.message ||
                "Password must be at least 8 characters long."}
            </p>
          )}
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-3 block text-lg font-semibold text-slate-700">
            Confirm Password
          </label>

          <div
            className={`flex h-16 items-center rounded-xl border px-4 ${
              errors.confirmPassword ? "border-red-400" : "border-slate-300"
            }`}
          >
            <Lock className="mr-4 h-5 w-5 text-slate-500" />

            <input
              {...register("confirmPassword")}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              className="flex-1 bg-transparent text-lg outline-none"
            />

            <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? (
                <EyeOff className="h-5 w-5 text-slate-500" />
              ) : (
                <Eye className="h-5 w-5 text-slate-500" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-2 text-base text-red-500">
              {errors.confirmPassword.message || "Passwords do not match."}
            </p>
          )}
        </div>

        {/* Register As */}

        <div>
          <label className="mb-4 block text-lg font-semibold text-slate-700">
            Register As
          </label>

          <div className="grid grid-cols-2 gap-4">
            {["Customer", "Client"].map((item) => {
              const selected = role === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setValue("role", item as "Customer" | "Client")
                  }
                  className={`rounded-2xl border p-5 text-left transition ${
                    selected
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{item}</span>

                    {selected && <CheckCircle2 className="text-blue-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Register Button */}

        <button
          disabled={isSubmitting}
          type="submit"
          className="h-16 w-full rounded-xl bg-blue-600 text-xl font-semibold text-white transition hover:bg-blue-700"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        {/* Login */}

        <p className="text-center text-lg text-slate-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={switchToLogin}
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
