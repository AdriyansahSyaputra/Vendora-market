import { useState, forwardRef } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

const PasswordInput = forwardRef(({ placeholder, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = showPassword ? EyeOff : Eye;

  return (
    <div className="relative">
      <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <Input
        // Ganti tipe input secara dinamis berdasarkan state
        type={showPassword ? "text" : "password"}
        className="h-12 w-full rounded-lg border border-slate-300 bg-transparent pl-10 pr-10 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
        aria-label={
          showPassword ? "Sembunyikan password" : "Tampilkan password"
        }
      >
        <Icon className="h-5 w-5" />
      </button>
    </div>
  );
});

export default PasswordInput;
