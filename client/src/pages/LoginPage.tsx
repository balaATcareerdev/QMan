import BrandingPanel from "@/component/LoginComponents/BrandingPanel";
import HeaderButton from "@/component/LoginComponents/HeaderButton";
import LoginForm from "@/component/LoginComponents/LoginForm";
import RegisterForm from "@/component/LoginComponents/RegisterForm";
import { useState } from "react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-14">
      <div className="grid w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        {/* Left */}

        <BrandingPanel />

        {/* Right */}

        <div className="flex items-center justify-center p-12">
          <div className="w-full max-w-xl">
            {/* Top Switch */}
            <div className="mb-12 flex">
              <HeaderButton
                isLogin={isLogin}
                setIsLogin={() => setIsLogin(true)}
                type="Login"
              />

              <HeaderButton
                isLogin={!isLogin}
                setIsLogin={() => setIsLogin(false)}
                type="Register"
              />
            </div>

            {/* Forms */}

            {isLogin ? (
              <LoginForm switchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm switchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </main>
  );

  // return (
  //   <div className="bg-linear-to-b from-black to-[#140B1B] min-h-screen text-white flex justify-center items-center">
  //     <div className="grid grid-cols-2 w-full max-w-6xl mx-auto bg-[#9711FB]/10 gap-5 rounded-xl overflow-hidden border border-[#29233f]">
  //       <div className="border-r border-[#29233f] h-full">
  //         <img
  //           src={loginBg}
  //           alt="Login Background"
  //           className="w-full h-full object-[center_left] object-cover"
  //         />
  //       </div>
  //       <div className="p-10">
  //         <div className="flex flex-col gap-2">
  //           <h1 className="text-4xl">Welcome back</h1>
  //           {type === "register" ? (
  //             <p className="text-gray-400 text-md">
  //               <span
  //                 onClick={() => setType("login")}
  //                 className="hover:underline cursor-pointer"
  //               >
  //                 Login
  //               </span>{" "}
  //               to continue to your account
  //             </p>
  //           ) : (
  //             <p className="text-gray-400 text-md">
  //               <span
  //                 onClick={() => setType("register")}
  //                 className="hover:underline cursor-pointer"
  //               >
  //                 Register
  //               </span>{" "}
  //               to create your account
  //             </p>
  //           )}
  //         </div>

  //         <form onSubmit={handleSubmit(onSubmit)}>
  //           {/* first and lastname */}
  //           {type === "register" && (
  //             <div className="flex gap-5 mt-5">
  //               <div className="flex-1 border border-[#29233f]  flex  p-2 justify-between items-center rounded-sm relative">
  //                 <UserPen color="#9711FB" />
  //                 <input
  //                   type="text"
  //                   className="bg-none outline-none p-1 w-full"
  //                   placeholder="Enter First Name"
  //                   {...register("fname")}
  //                 />
  //                 {type === "register" && "fname" in errors && errors.fname && (
  //                   <div className="group">
  //                     <CircleAlert color="#c93626" className="cursor-pointer" />

  //                     <div className="absolute -right-10 -bottom-10  bg-[#c93626]/70 text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-100">
  //                       <p>{errors.fname.message}</p>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //               <div className="flex-1 border border-[#29233f] flex p-2 justify-between items-center rounded-sm relative">
  //                 <UserPen color="#9711FB" />
  //                 <input
  //                   type="text"
  //                   className="bg-none outline-none p-1 w-full"
  //                   placeholder="Enter Last Name"
  //                   {...register("lname")}
  //                 />
  //                 {type === "register" && "lname" in errors && errors.lname && (
  //                   <div className="group">
  //                     <CircleAlert color="#c93626" className="cursor-pointer" />

  //                     <div className="absolute -right-10 -bottom-10  bg-[#c93626]/70 text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-100">
  //                       <p>{errors.lname.message}</p>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //             </div>
  //           )}

  //           {type === "register" && (
  //             <div className="flex items-center justify-start pt-5 gap-5 px-2">
  //               <p className="text-[#9711FB]">Role:</p>

  //               <div className="flex justify-center items-center gap-5">
  //                 <label className="flex items-center justify-center gap-1">
  //                   <input
  //                     type="radio"
  //                     value={"Client"}
  //                     className="accent-[#9711FB]"
  //                     {...register("role")}
  //                   />
  //                   <span className="text-sm">Client</span>
  //                 </label>

  //                 <label className="flex items-center justify-center gap-1">
  //                   <input
  //                     type="radio"
  //                     value={"Customer"}
  //                     className="accent-[#9711FB]"
  //                     {...register("role")}
  //                   />
  //                   <span className="text-sm">Customer</span>
  //                 </label>
  //               </div>
  //             </div>
  //           )}

  //           <div className="flex flex-col mt-10 gap-5">
  //             <div className="border border-[#29233f] flex p-2 justify-between items-center rounded-sm relative">
  //               <Mail color="#9711FB" />
  //               <input
  //                 type="email"
  //                 className="bg-none outline-none p-1 w-full pl-3"
  //                 placeholder="Enter Email"
  //                 {...register("email")}
  //               />

  //               {errors.email && (
  //                 <div className="group">
  //                   <CircleAlert color="#c93626" className="cursor-pointer" />

  //                   <div className="absolute -right-10 -bottom-10  bg-[#c93626]/70 text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-100">
  //                     <p>{errors.email.message}</p>
  //                   </div>
  //                 </div>
  //               )}
  //             </div>

  //             <div className="border border-[#29233f] flex p-2 justify-between items-center rounded-sm relative ">
  //               <KeyRound color="#9711FB" />
  //               <input
  //                 type="password"
  //                 className="bg-none outline-none p-1 w-full pl-3"
  //                 placeholder="Enter Password"
  //                 {...register("password")}
  //               />

  //               {errors.password && (
  //                 <div className="group">
  //                   <CircleAlert color="#c93626" className="cursor-pointer" />

  //                   <div className="absolute -right-10 -bottom-10  bg-[#c93626]/70 text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-100">
  //                     <p>{errors.password.message}</p>
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //           </div>

  //           <div className="flex justify-end mt-5 mb-5">
  //             <span className="text-[#FF1994] hover:underline cursor-pointer">
  //               Forgot Password?
  //             </span>
  //           </div>

  //           <div className="flex justify-center items-center">
  //             <button
  //               className="text-lg bg-linear-to-r from-[#4B325E] to-[#FA73C4] hover:from-[#4B325E]/50 hover:to-[#FA73C4]/50 w-full p-3 rounded-sm transition-all duration-300 flex justify-center items-center gap-2"
  //               disabled={isSubmitting}
  //             >
  //               {type === "register" ? "Register" : "Login"}
  //               {isSubmitting && <LoaderCircle className="animate-spin" />}
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default LoginPage;
