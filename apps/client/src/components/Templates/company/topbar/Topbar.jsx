import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarMenuContent } from "../../vendor/sidebar/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/Elements/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  PanelLeft,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const Topbar = ({ isCollapsed, setIsCollapsed }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-white dark:bg-gray-950 px-4 sm:px-6">
      {/* Tombol Sidebar untuk Mobile (menggunakan Sheet) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="md:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Buka Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarMenuContent isCollapsed={false} />
        </SheetContent>
      </Sheet>

      {/* Tombol Sidebar untuk Desktop */}
      <Button
        variant="outline"
        size="icon"
        className="hidden md:flex"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <PanelLeftOpen className="h-5 w-5" />
        ) : (
          <PanelLeftClose className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <h1 className="text-lg font-semibold md:text-xl hidden sm:block ml-2">
        Welcome back, Admin!
      </h1>

      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Messages menu */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="text-xs md:text-sm">Pratinjau Pesan</div>
          </PopoverContent>
        </Popover>

        {/* Notifications menu  */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="text-xs md:text-sm">Pratinjau Notifikasi</div>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-4 hidden md:block" />

        <ModeToggle className="hidden md:flex" />

        <Separator orientation="vertical" className="h-4 hidden md:block" />

        <DropdownMenu onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-auto px-2 py-2 space-x-2 cursor-pointer"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium">shadcn</p>
                <p className="text-xs text-muted-foreground">
                  shadcn@example.com
                </p>
              </div>

              {open ? (
                <ChevronUp className="hidden md:block h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Akun</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
