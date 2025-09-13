import { useCart } from "@/context/CartContext";
import type { CartItem as CartItemType } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, Plus, Minus } from "lucide-react";
import CategoryIcon from "./CategoryIcon";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    const parsedQuantity = parseInt(String(newQuantity), 10);
    if (!isNaN(parsedQuantity)) {
      updateQuantity(item.id, parsedQuantity);
    }
  };

  const price = typeof item.price === 'number' ? item.price : 0;
  const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
  const imageUrl = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : "/placeholder.svg";

  return (
    <div className="flex items-start gap-4 py-4">
      <img
        src={imageUrl}
        alt={item.name}
        className="h-24 w-24 rounded-md object-cover border"
      />
      <div className="flex-grow grid gap-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-base">{item.name}</h4>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive h-8 w-8"
            onClick={() => removeFromCart(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">${price.toFixed(2)} per item</p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            className="h-9 w-14 text-center"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            min="1"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-lg">${(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;