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
import { Tag, MapPin, Eye, User, Calendar, Truck, Vegan, Leaf, Sprout, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { mockSellers } from "@/data/mockData";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductQuickView } from "./ProductQuickView";
import { cn, formatPrice } from "@/lib/utils";
import CategoryIcon from "./CategoryIcon";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();

  const seller = mockSellers.find((s) => s.id === product.sellerId);
  const imageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : "/placeholder.svg";
  
  const isAvailableInFuture = product.productionDate && new Date(product.productionDate) > new Date();

  return (
    <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
      <Card className={cn("w-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1", className)}>
        <CardHeader className="p-0">
          <DialogTrigger asChild>
            <div className="overflow-hidden relative cursor-pointer">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-secondary text-secondary-foreground p-3 rounded-full">
                  <Eye className="h-5 w-5" />
                </div>
              </div>
            </div>
          </DialogTrigger>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="flex-grow">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <div className="flex items-center gap-2 min-w-0">
                <User className="h-3 w-3 flex-shrink-0" />
                <Link to={`/seller/${seller?.id}`} state={{ fromProduct: { id: product.id, name: product.name } }} className="hover:underline truncate">
                  {seller?.name || "Unknown Seller"}
                </Link>
              </div>
              {seller && (
                <Badge variant="secondary" className="capitalize text-xs flex-shrink-0">
                  {seller.sellerType}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg font-bold leading-tight h-14">
              <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors flex items-start gap-2">
                <CategoryIcon category={product.category} className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{product.name}</span>
              </Link>
            </CardTitle>
            <p className="text-xs text-muted-foreground font-mono mt-1 mb-2"># {product.sku}</p>
            
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{product.region}</span>
              </div>
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Ships in {product.deliveryTimeInDays} day(s)</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground pt-1 min-h-[28px]">
                {isAvailableInFuture && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-primary" />
                    <span className="font-medium text-primary">Preorder</span>
                  </div>
                )}
                {product.isVegan && (
                  <div className="flex items-center gap-1.5">
                    <Vegan className="h-3 w-3" />
                    <span>Vegan</span>
                  </div>
                )}
                {product.isVegetarian && !product.isVegan && (
                  <div className="flex items-center gap-1.5">
                    <Leaf className="h-3 w-3" />
                    <span>Vegetarian</span>
                  </div>
                )}
                {product.harvestOnDemand && (
                  <div className="flex items-center gap-1.5">
                    <Sprout className="h-3 w-3" />
                    <span>Harvest on Demand</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3">
            <Tag className="h-4 w-4 text-primary" />
            <p className="text-lg font-semibold text-primary">
              {formatPrice(product)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
          <Button variant="outline" asChild>
            <Link to={`/product/${product.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </Link>
          </Button>
          <Button onClick={() => addToCart(product)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        </CardFooter>
      </Card>
      <DialogContent
        className="w-[95vw] max-w-lg rounded-2xl sm:max-w-xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <ProductQuickView product={product} seller={seller} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductCard;