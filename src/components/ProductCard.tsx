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
import { Tag, MapPin, Eye, User, Calendar, Truck, Vegan, Leaf, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { mockSellers } from "@/data/mockData";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductQuickView } from "./ProductQuickView";
import { cn, formatPrice } from "@/lib/utils";
import CategoryIcon from "./CategoryIcon";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const seller = mockSellers.find((s) => s.id === product.sellerId);
  const imageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : "/placeholder.svg";
  
  const firstBatch = product.batches?.[0];
  const productionDate = firstBatch?.productionDate;

  const isAvailableInFuture = productionDate && new Date(productionDate) > new Date();

  const availabilityText = () => {
    if (!isAvailableInFuture || !productionDate) return null;
    const date = new Date(productionDate);
    const distance = formatDistanceToNowStrict(date, { addSuffix: true });
    return `Available ${distance} (${format(date, "MMM d")})`;
  };

  return (
    <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
      <Card className={cn("w-full overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1", className)}>
        <CardHeader className="p-0">
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
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <User className="h-3 w-3 flex-shrink-0" />
              <Link to={`/seller/${seller?.id}`} className="hover:underline truncate">
                {seller?.name || "Unknown Seller"}
              </Link>
            </div>
            {seller && (
              <Badge variant={seller.sellerType === 'commercial' ? 'default' : 'secondary'} className="capitalize text-xs flex-shrink-0">
                {seller.sellerType}
              </Badge>
            )}
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
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Truck className="h-4 w-4" />
            <span>Ready to ship: {product.deliveryTimeInDays} day(s)</span>
          </div>
          <div className="mb-2">
            <Badge variant="secondary" className="font-mono">
              # {product.sku}
            </Badge>
          </div>
          {isAvailableInFuture && (
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
              <Calendar className="h-4 w-4" />
              <span>{availabilityText()}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-muted-foreground my-2">
            <TooltipProvider delayDuration={100}>
              {product.isVegan && (
                <Tooltip>
                  <TooltipTrigger>
                    <Vegan className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Vegan</TooltipContent>
                </Tooltip>
              )}
              {product.isVegetarian && !product.isVegan && (
                <Tooltip>
                  <TooltipTrigger>
                    <Leaf className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Vegetarian</TooltipContent>
                </Tooltip>
              )}
              {product.harvestOnDemand && (
                <Tooltip>
                  <TooltipTrigger>
                    <Sprout className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Harvest on Demand</TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <p className="text-lg font-semibold text-primary">
              {formatPrice(product)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full">
            <Link to={`/product/${product.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Options
            </Link>
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