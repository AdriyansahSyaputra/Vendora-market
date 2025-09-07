import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItemCard = ({
  item,
  isSelected,
  onCheckboxChange,
  onQuantityChange,
  onRemove,
}) => (
  <div className="flex items-start space-x-4 py-4">
    <div className="pt-1">
      <Checkbox
        checked={isSelected}
        onChange={(e) => onCheckboxChange(item.id, e.target.checked)}
      />
    </div>
    <img
      src={item.image}
      alt={item.name}
      className="w-20 h-20 md:w-24 md:h-24 rounded-md object-cover flex-shrink-0"
    />
    <div className="flex-grow">
      <p className="text-sm md:text-base font-medium text-slate-800 dark:text-slate-200 line-clamp-2 leading-tight">
        {item.name}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {item.variation}
      </p>
      <p className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 mt-2">
        {item.price.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-md w-fit">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            {" "}
            <Minus className="h-4 w-4" />{" "}
          </Button>
          <span className="px-3 text-sm font-medium">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            disabled={item.quantity >= item.stock}
          >
            {" "}
            <Plus className="h-4 w-4" />{" "}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-500 hover:text-red-500"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

export default CartItemCard;