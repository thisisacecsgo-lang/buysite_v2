import type { CartItem } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CategoryIcon from "./CategoryIcon";
import { format, addDays } from "date-fns";
import { Calendar } from "lucide-react";

interface OrderSummaryItemProps {
  item: CartItem;
}

const OrderSummaryItem = ({ item }: OrderSummaryItemProps) => {
  const price = typeof item.price === 'number' ? item.price : 0;
  const imageUrl = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : "/placeholder.svg";
  const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
  const deliveryDate = addDays(new Date(), item.deliveryTimeInDays);

  return (
    <div className="flex items-start gap-4 py-3">
      <Avatar className="h-16 w-16 rounded-md border">
        <AvatarImage src={imageUrl} alt={item.name} className="object-cover" />
        <AvatarFallback>
          <CategoryIcon category={item.category} />
        </AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <p className="font-semibold">{item.name}</p>
        <p className="text-xs text-muted-foreground font-mono">SKU: {item.sku}</p>
        <p className="text-sm text-muted-foreground">
          Quantity: {quantity}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <Calendar className="h-3 w-3" />
          <span>Est. Delivery: {format(deliveryDate, "MMM d, yyyy")}</span>
        </div>
      </div>
      <div className="text-right font-medium">
        €{(price * quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderSummaryItem;