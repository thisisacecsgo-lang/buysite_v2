import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { Tag, ShoppingCart, MapPin, Eye, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { mockSellers } from "@/data/mockData";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductQuickView } from "./ProductQuickView";
import { cn } from "@/lib/utils";
import CategoryIcon from "./CategoryIcon";
import { format, formatDistanceToNowStrict } from "date-fns";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const seller = mockSellers.find((s) => s.id === product.sellerId);
  const imageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : "/placeholder.svg";

  const isAvailableInFuture = product.productionDate && new Date(product.productionDate) > new Date();

  const availabilityText = () => {
    if (!isAvailableInFuture || !product.productionDate) return null;
    const date = new Date(product.productionDate);
    const distance = formatDistanceToNowStrict(date, { addSuffix: true });
    return `Available ${distance} (${format(date, "MMM d")})`;
  };

  return (
    <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
      <Card className={cn("w-full overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1", className)}>
        <CardHeader className="p-0 relative">
          <DialogTrigger asChild>
            <div className="overflow-hidden relative cursor-pointer">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-secondary text-secondary-foreground p-3 rounded-full">
                  <Eye className="h-5 w-5" />
                </div>
              </div>
            </div>
          </DialogTrigger>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <User className="h-3 w-3" />
            <Link to={`/seller/${seller?.id}`} className="hover:underline">
              {seller?.name || "Unknown Seller"}
            </Link>
          </div>
          <CardTitle className="text-lg font-bold mb-2 leading-tight">
            <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors flex items-start gap-2">
              <CategoryIcon category={product.category} className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span>{product.name}</span>
            </Link>
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span>{product.region}</span>
          </div>
          {isAvailableInFuture && (
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
              <Calendar className="h-4 w-4" />
              <span>{availabilityText()}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <p className="text-lg font-semibold text-primary">
              {typeof product.price === "number"
                ? `€${product.price.toFixed(2)}`
                : "Free"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={() => addToCart(product)}
            disabled={isAvailableInFuture}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAvailableInFuture ? "Pre-order" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
      <DialogContent className="sm:max-w-3xl">
        <ProductQuickView product={product} seller={seller} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductCard;