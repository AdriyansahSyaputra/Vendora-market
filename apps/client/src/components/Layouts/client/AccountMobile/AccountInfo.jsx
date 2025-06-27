import { User, Mail, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const AccountInfo = () => {
  return (
    <div className="w-full dark:bg-gray-800/50 py-6 border-b border-gray-100">
      <div className="px-4 flex items-center relative">
        <div className="w-12 h-12 bg-gray-100 rounded-full">
          <img
            src="https://placehold.co/300x300/e2e8f0/e2e8f0?text=?"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="ml-4 flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <p className="text-sm font-medium">John Doe</p>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <p className="text-xs font-medium">john@example.com</p>
          </div>
        </div>

        <Link to="/settings" className="absolute right-4 flex items-center space-x-2 cursor-pointer">
          <Settings className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default AccountInfo;
