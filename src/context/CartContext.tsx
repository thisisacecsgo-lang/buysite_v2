import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product, CartItem, Batch } from "@/types";
import { toast } from "sonner";
import {
  parseQuantityToKg,
  getPricePerKg,
  getDisplayUnit,
  getStepForDisplayUnit,
  convertDisplayUnitToKg,
} from "@/lib/unitConverter";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, batch: Batch) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem("farmFreshCart");
      if (localData) {
        const parsedData = JSON.parse(localData);
        if (Array.isArray(parsedData)) {
          return parsedData.filter(item => item && typeof item === 'object' && item.id);
        }
      }
      return [];
    } catch (error) {
      console.error("Error reading cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("farmFreshCart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage", error);
    }
  }, [cartItems]);

  const addToCart = (product: Product, batch: Batch) => {
    const cartItemId = `${product.id}-${batch.id}`;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === cartItemId);
      if (existingItem) {
        toast.info(`${product.name} is already in your cart. You can adjust the quantity there.`);
        return prevItems;
      }

      const maxWeight = parseQuantityToKg(batch.quantity, product.name, product.category);
      if (maxWeight < 0.05) {
        toast.error(`This batch of ${product.name} is too small to be added.`);
        return prevItems;
      }

      const displayUnit = getDisplayUnit(product.name, product.category);
      const step = getStepForDisplayUnit(displayUnit);
      const minQuantityInDisplayUnit = displayUnit === 'piece' ? 1 : step;
      const initialQuantityInKg = convertDisplayUnitToKg(minQuantityInDisplayUnit, product.name, product.category);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { status, createdAt, ...productData } = product;
      const newItem: CartItem = {
        ...productData,
        id: cartItemId,
        batch: batch,
        quantity: initialQuantityInKg,
      };
      toast.success(`${product.name} added to cart!`);
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== cartItemId)
    );
    toast.error("Item removed from cart.");
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== cartItemId) return item;

        const maxWeight = parseQuantityToKg(item.batch.quantity, item.name, item.category);
        let newQuantity = quantity;
        if (newQuantity > maxWeight) {
            newQuantity = maxWeight;
            toast.warning(`Maximum weight for this batch is ${maxWeight.toFixed(2)} kg.`);
        }
        
        return { ...item, quantity: newQuantity };
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared.");
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const pricePerKg = getPricePerKg(item);
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return total + pricePerKg * quantity;
  }, 0);

  const itemCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};