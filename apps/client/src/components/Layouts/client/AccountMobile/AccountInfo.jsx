import { User, Mail, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AccountInfo = ({ user, userInitials }) => {
  return (
    <div className="w-full dark:bg-gray-800/50 py-6 border-b border-gray-100">
      <div className="px-4 flex items-center relative">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={user.avatarUrl || ""} alt={`@${user.username}`} />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
        <div className="ml-4 flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <p className="text-sm font-medium">{user.username}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <p className="text-xs font-medium">{user.email}</p>
          </div>
        </div>

        <Link
          to="/settings"
          className="absolute right-4 flex items-center space-x-2 cursor-pointer"
        >
          <Settings className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default AccountInfo;
