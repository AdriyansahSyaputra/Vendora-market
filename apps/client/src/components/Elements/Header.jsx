import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = ({ title, onBack }) => (
  <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white/80 dark:bg-slate-900 px-4 backdrop-blur-sm sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-full"
      onClick={onBack}
    >
      <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      <span className="sr-only">Kembali</span>
    </Button>
    <h1 className="flex-1 text-lg font-semibold text-slate-800 dark:text-slate-200">
      {title}
    </h1>
  </header>
);

export default Header;
