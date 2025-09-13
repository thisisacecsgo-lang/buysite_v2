import { Link, useLocation, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Gift, Truck } from "lucide-react";
import { format } from "date-fns";
import BackButton from "@/components/BackButton";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { Footer } from "@/components/Footer";
import OrderSummaryItem from "@/components/OrderSummaryItem";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/types";

const OrderConfirmation = () => {
  const location = useLocation();
  const {
    orderId,
    totalAmount,
    date,
    items,
    deliveryFee,
    isPensioner,
    subtotal,
  } = (location.state as {
    orderId: string;
    totalAmount: number;
    date: string;
    items: CartItem[];
    deliveryFee: number;
    isPensioner: boolean;
    subtotal: number;
  }) || {};

  if (!orderId || !items) {
    // Redirect to home if state is not available (e.g., direct navigation)
    return <Navigate to="/" replace />;
  }

  const pensionerDiscount = 2.0; // Standard $2.00 discount for pensioners

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <BackButton />
        <AppBreadcrumb />
        <div className="flex items-center justify-center mt-8">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center p-6">
              <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <CardTitle className="text-3xl">Thank you for your order!</CardTitle>
              <p className="text-muted-foreground pt-2">
                Your order has been placed successfully. We'll notify you once it's on its way.
              </p>
            </CardHeader>
            <CardContent className="space-y-6 p-6 pt-0">
              <div className="border rounded-lg p-4 space-y-4 bg-secondary/50">
                <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                <div className="divide-y">
                  {items.map((item) => (
                    <OrderSummaryItem key={item.id} item={item} />
                  ))}
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Products Total</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      <span>Delivery Fee</span>
                    </div>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  {isPensioner && (
                    <div className="flex justify-between items-center text-primary">
                       <div className="flex items-center gap-2">
                        <Gift className="h-4 w-4" />
                        <span>Pensioner Discount</span>
                      </div>
                      <span className="font-medium">-${pensionerDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total Amount:</span>
                    <span>${(totalAmount - (isPensioner ? pensionerDiscount : 0)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Order Number:</span>
                    <span className="font-mono">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Date:</span>
                    <span>{format(new Date(date), "PPP p")}</span>
                  </div>
                </div>
              </div>
               <p className="text-xs text-center text-muted-foreground">
                Your receipt will be sent to your email.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;