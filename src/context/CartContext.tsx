import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product, CartItem, Batch } from "@/types";
import { toast } from "sonner";

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
        return prevItems.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { batches, status, createdAt, ...productData } = product;
      const newItem: CartItem = {
        ...productData,
        id: cartItemId,
        batch: batch,
        quantity: 1,
      };
      return [...prevItems, newItem];
    });
    toast.success(`${product.name} added to cart!`);
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
      prevItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared.");
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return total + price * quantity;
  }, 0);

  const itemCount = cartItems.reduce((count, item) => {
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return count + quantity;
  }, 0);

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