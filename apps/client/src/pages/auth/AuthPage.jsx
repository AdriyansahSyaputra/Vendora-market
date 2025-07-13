import { useState } from "react";
import { MailIcon, LockIcon, UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const GoogleIcon = (props) => (
  <svg viewBox="0 0 48 48" {...props}>
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.494,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm md:p-12">
      {/* Header Form */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {isRegister ? "Create an account" : "Welcome Back to Your Store!"}
        </h1>
        <p className="mt-2 text-slate-600">
          {isRegister
            ? "Start your shopping journey with us."
            : "Log in to continue to your store."}
        </p>
      </div>

      {/* Tombol Login Google */}
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      >
        <GoogleIcon className="h-6 w-6" />
        <span className="text-sm font-medium">Login with Google</span>
      </button>

      {/* Pembatas "ATAU" */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-slate-500">or</span>
        </div>
      </div>

      {/* Form Email & Password */}
      <form className="space-y-6" action="#" method="POST">
        {isRegister && (
          <div className="relative">
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              name="fullname"
              type="text"
              required
              className="h-12 rounded-lg border border-slate-300 bg-transparent pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="Full Name"
            />
          </div>
        )}
        <div className="relative">
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            name="username"
            type="text"
            required
            className="h-12 w-full rounded-lg border border-slate-300 bg-transparent pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Username"
          />
        </div>
        <div className="relative">
          <MailIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            name="email"
            type="email"
            required
            className="h-12 w-full rounded-lg border border-slate-300 bg-transparent pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Email Address"
          />
        </div>
        <div className="relative">
          <LockIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            name="password"
            type="password"
            required
            className="h-12 w-full rounded-lg border border-slate-300 bg-transparent pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-lg bg-slate-900 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          {isRegister ? "Create an account" : "Login"}
        </button>
      </form>

      {/* Tautan untuk beralih antara Login dan Register */}
      <p className="text-center text-sm text-slate-600">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="font-semibold text-slate-800 hover:underline focus:outline-none"
        >
          {isRegister ? "Login" : "Register now!"}
        </button>
      </p>
    </div>
  );
};

const AuthPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-4 font-sans">
      <AuthForm />
    </main>
  );
};

export default AuthPage;
