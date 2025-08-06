import { Tag, ShoppingCart, Store, Info, Cog, Bell } from "lucide-react";

export const iconMap = {
  promo: <Tag className="h-5 w-5 text-sky-500" />,
  order: <ShoppingCart className="h-5 w-5 text-green-500" />,
  store: <Store className="h-5 w-5 text-purple-500" />,
  info: <Info className="h-5 w-5 text-gray-500" />,
  system: <Cog className="h-5 w-5 text-gray-500" />,
  default: <Bell className="h-5 w-5 text-gray-500" />,
};
