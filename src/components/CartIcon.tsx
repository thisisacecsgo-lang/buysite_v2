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
        className="relative h-12 w-12"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-7 w-7" />
        {itemCount > 0 && (
          <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 min-w-[1.25rem] px-1.5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
};

export default CartIcon;