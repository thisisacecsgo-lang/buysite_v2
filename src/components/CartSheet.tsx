import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { Separator } from "./ui/separator";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartSheet = ({ open, onOpenChange }: CartSheetProps) => {
  const { cartItems, cartTotal, clearCart, itemCount } = useCart();
  const shippingFee = 3.50;
  const total = cartTotal > 0 ? cartTotal + shippingFee : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col sm:max-w-lg">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>My Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              <div className="divide-y divide-border -my-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            <SheetFooter className="border-t bg-background p-6">
              {/* This single div wrapper prevents SheetFooter's flex-col-reverse from reordering the totals and buttons */}
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>${shippingFee.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <SheetClose asChild>
                    <Button asChild className="w-full" size="lg">
                      <Link to="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      onClick={() => clearCart()}
                      className="w-full"
                    >
                      Clear Cart
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some products to get started.</p>
            <SheetClose asChild>
              <Button variant="outline" className="mt-4">Continue Shopping</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;