import { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartSheet from "./CartSheet";

const CartIcon = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-16 w-16"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-10 w-10" />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-sm font-bold rounded-full h-8 min-w-[2rem] px-2 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
};

export default CartIcon;