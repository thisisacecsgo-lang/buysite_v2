import { useMemo } from "react";
import type { Product, Seller } from "@/types";
import { Button } from "@/components/ui/button";
import { Tag, MapPin, User, Info, Truck, Calendar, Vegan, Leaf, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CategoryIcon from "./CategoryIcon";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import CopyableBadge from "./CopyableBadge";

interface ProductQuickViewProps {
  product: Product;
  seller?: Seller;
}

export const ProductQuickView = ({ product, seller }: ProductQuickViewProps) => {
  const imageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : "/placeholder.svg";
  
  const earliestProductionDate = useMemo(() => {
    if (!product || !product.batches || product.batches.length === 0) {
      return null;
    }
    const futureBatches = product.batches
      .map((b) => new Date(b.productionDate))
      .filter((d) => d > new Date());

    if (futureBatches.length === 0) {
      return null;
    }

    return new Date(Math.min(...futureBatches.map((d) => d.getTime())));
  }, [product]);

  const isAvailableInFuture = !!earliestProductionDate;

  return (
    <>
      <DialogHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <CategoryIcon category={product.category} className="h-6 w-6 text-muted-foreground" />
            <DialogTitle className="text-2xl">{product.name}</DialogTitle>
          </div>
        </div>
        <DialogDescription>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pl-9">
            <MapPin className="h-4 w-4" />
            <span>{product.region}</span>
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div>
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg border"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            <p className="text-2xl font-semibold text-primary">
              {formatPrice(product)}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CopyableBadge textToCopy={product.sku} />
            <Badge variant="secondary"><Truck className="mr-1.5 h-3 w-3" /> Ships in {product.deliveryTimeInDays} day(s)</Badge>
            <TooltipProvider>
              <div className="flex items-center gap-3">
                {isAvailableInFuture && (
                  <Tooltip>
                    <TooltipTrigger onFocus={(e) => e.preventDefault()}>
                      <Badge variant="outline" className="text-primary border-primary cursor-default">
                        <Calendar className="mr-1.5 h-3 w-3" /> Preorder
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This item is available for preorder.</p>
                      {earliestProductionDate && (
                        <p>Expected to be ready on: {format(earliestProductionDate, "PPP")}</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                )}
                {product.isVegan && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Vegan className="h-5 w-5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Vegan</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {product.isVegetarian && !product.isVegan && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Leaf className="h-5 w-5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Vegetarian</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {product.harvestOnDemand && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Sprout className="h-5 w-5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Harvest on Demand</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </TooltipProvider>
          </div>
          {product.description && (
            <div className="flex items-start gap-3 text-sm">
              <Info className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          )}
          {seller && (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={seller.logoUrl} />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground">Sold by</p>
                <Link to={`/seller/${seller.id}`} className="font-semibold hover:underline">{seller.name}</Link>
              </div>
            </div>
          )}
          <div className="pt-4">
            <Button size="lg" className="w-full" asChild>
              <Link to={`/product/${product.id}`}>View Full Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};