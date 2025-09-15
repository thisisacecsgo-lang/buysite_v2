import type { Review, Product, Seller } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "./StarRating";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface CustomerReviewCardProps {
  review: Review;
  product: Product;
  seller: Seller;
}

const CustomerReviewCard = ({ review, product, seller }: CustomerReviewCardProps) => {
  const imageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : "/placeholder.svg";

  return (
    <Card>
      <CardContent className="p-4 flex items-start gap-4">
        <Link to={`/product/${product.id}`}>
          <img
            src={imageUrl}
            alt={product.name}
            className="h-24 w-24 rounded-md object-cover border flex-shrink-0"
          />
        </Link>
        <div className="flex-grow space-y-2">
          <div>
            <Link to={`/product/${product.id}`} className="font-semibold hover:underline">
              {product.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              Sold by <Link to={`/seller/${seller.id}`} className="hover:underline">{seller.name}</Link>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <StarRating rating={review.rating} />
            <p className="text-xs text-muted-foreground">{format(new Date(review.date), "PPP")}</p>
          </div>
          <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerReviewCard;