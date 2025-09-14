import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import type { CartItem as CartItemType } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, Plus, Minus } from "lucide-react";
import {
  getDisplayUnit,
  getStepForDisplayUnit,
  getMaxQuantityInDisplayUnit,
  getPricePerDisplayUnit,
  convertKgToDisplayUnit,
  convertDisplayUnitToKg,
  getPricePerKg,
} from "@/lib/unitConverter";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const displayUnit = getDisplayUnit(item.name, item.category);
  const step = getStepForDisplayUnit(displayUnit);
  const minQuantity = displayUnit === 'piece' ? 1 : step;
  const maxQuantity = getMaxQuantityInDisplayUnit(item.batch.quantity, item.name, item.category);
  const pricePerUnit = getPricePerDisplayUnit(item);
  const totalItemPrice = getPricePerKg(item) * item.quantity;

  const formatDisplayValue = (num: number) => {
    if (displayUnit === 'piece') {
      return String(Math.round(num));
    }
    return num.toFixed(displayUnit === 'L' ? 1 : 2);
  };

  const [inputValue, setInputValue] = useState(formatDisplayValue(convertKgToDisplayUnit(item.quantity, item.name, item.category)));

  useEffect(() => {
    const newDisplayQuantity = convertKgToDisplayUnit(item.quantity, item.name, item.category);
    setInputValue(formatDisplayValue(newDisplayQuantity));
  }, [item.quantity, item.name, item.category, displayUnit]);

  const updateCartQuantity = (newDisplayQuantity: number) => {
    if (isNaN(newDisplayQuantity)) return;

    let clampedQuantity = Math.max(minQuantity, newDisplayQuantity);
    clampedQuantity = Math.min(clampedQuantity, maxQuantity);

    let snappedQuantity: number;
    if (displayUnit === 'piece') {
      snappedQuantity = Math.round(clampedQuantity);
    } else {
      snappedQuantity = Math.round(clampedQuantity / step) * step;
    }

    const newKgQuantity = convertDisplayUnitToKg(snappedQuantity, item.name, item.category);
    
    if (newKgQuantity !== item.quantity) {
      updateQuantity(item.id, newKgQuantity);
    } else {
      setInputValue(formatDisplayValue(snappedQuantity));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleBlur = () => {
    const parsedValue = parseFloat(inputValue);
    if (inputValue === '' || isNaN(parsedValue)) {
      const originalDisplayQuantity = convertKgToDisplayUnit(item.quantity, item.name, item.category);
      setInputValue(formatDisplayValue(originalDisplayQuantity));
    } else {
      updateCartQuantity(parsedValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleIncrement = () => {
    const currentVal = parseFloat(inputValue) || 0;
    updateCartQuantity(currentVal + step);
  };

  const handleDecrement = () => {
    const currentVal = parseFloat(inputValue) || 0;
    updateCartQuantity(currentVal - step);
  };

  const imageUrl = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : "/placeholder.svg";
  const displayUnitString = displayUnit === 'piece' ? 'pc' : displayUnit;

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
          €{pricePerUnit.toFixed(2)} / {displayUnitString}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={handleDecrement}
            disabled={(parseFloat(inputValue) || 0) <= minQuantity}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="relative h-9">
            <Input
              type="text"
              inputMode={displayUnit === 'piece' ? 'numeric' : 'decimal'}
              className="h-9 w-24 text-center"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
              {displayUnitString}
            </span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={handleIncrement}
            disabled={(parseFloat(inputValue) || 0) >= maxQuantity}
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