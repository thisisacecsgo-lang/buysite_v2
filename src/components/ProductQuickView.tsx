import type { Product, Seller } from "@/types";
import { Button } from "@/components/ui/button";
import { Tag, MapPin, User, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CategoryIcon from "./CategoryIcon";

interface ProductQuickViewProps {
  product: Product;
  seller?: Seller;
}

export const ProductQuickView = ({ product, seller }: ProductQuickViewProps) => {
  const imageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : "/placeholder.svg";

  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-3">
          <CategoryIcon category={product.category} className="h-6 w-6 text-muted-foreground" />
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
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
              {typeof product.price === "number"
                ? `€${product.price.toFixed(2)}`
                : "Free"}
            </p>
          </div>
          {product.description && (
            <div className="flex items-start gap-3 text-sm">
              <Info className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          )}
          {seller && (
            <div className="flex items-center gap-3 pt-2">
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
          <div className="space-y-2 pt-4">
            <Button size="lg" className="w-full" asChild>
              <Link to={`/product/${product.id}`}>View Full Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};