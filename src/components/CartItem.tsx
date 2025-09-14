import { useCart } from "@/context/CartContext";
import type { CartItem as CartItemType } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, Plus, Minus } from "lucide-react";
import { parseQuantityToKg, getPricePerKg } from "@/lib/unitConverter";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const maxWeight = parseQuantityToKg(item.batch.quantity, item.name, item.category);
  const pricePerKg = getPricePerKg(item);
  const totalItemPrice = pricePerKg * item.quantity;

  const handleWeightChange = (newWeight: number) => {
    if (isNaN(newWeight)) return;

    // Clamp and snap to grid
    let clampedWeight = Math.max(0.05, newWeight);
    clampedWeight = Math.min(clampedWeight, maxWeight);
    const snappedWeight = Math.round(clampedWeight / 0.05) * 0.05;
    updateQuantity(item.id, parseFloat(snappedWeight.toFixed(2)));
  };

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
        <p className="text-xs text-muted-foreground font-mono"># {item.sku}</p>
        <p className="text-sm text-muted-foreground">
          €{pricePerKg.toFixed(2)} / kg
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => handleWeightChange(item.quantity - 0.05)}
            disabled={item.quantity <= 0.05}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="relative h-9">
            <Input
              type="number"
              className="h-9 w-24 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={item.quantity.toFixed(2)}
              onChange={(e) => handleWeightChange(parseFloat(e.target.value))}
              onBlur={(e) => handleWeightChange(parseFloat(e.target.value))} // Snap back on blur
              step="0.05"
              min="0.05"
              max={maxWeight.toFixed(2)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
              kg
            </span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => handleWeightChange(item.quantity + 0.05)}
            disabled={item.quantity >= maxWeight}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-lg">€{totalItemPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;