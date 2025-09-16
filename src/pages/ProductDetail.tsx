import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Tag,
  MapPin,
  Info,
  User,
  Vegan,
  Leaf,
  Truck,
  Sprout,
  Calendar,
  ShoppingCart,
  Package,
  CalendarClock,
} from "lucide-react";
import { mockProducts, mockSellers } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import BackButton from "@/components/BackButton";
import { Footer } from "@/components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "@/components/ProductCard";
import CategoryIcon from "@/components/CategoryIcon";
import { formatPrice, formatShippingTime } from "@/lib/utils";
import StarRating from "@/components/StarRating";
import CopyableBadge from "@/components/CopyableBadge";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const product = mockProducts.find((p) => p.id === id);
  const seller = product
    ? mockSellers.find((s) => s.id === product.sellerId)
    : undefined;

  const isAvailableInFuture = useMemo(() => {
    if (!product || !product.productionDate) {
      return false;
    }
    return new Date(product.productionDate) > new Date();
  }, [product]);

  const productionDate = isAvailableInFuture ? new Date(product.productionDate) : null;

  const averageRating = useMemo(() => {
    if (!seller || seller.reviews.length === 0) {
      return 0;
    }
    const totalRating = seller.reviews.reduce((acc, r) => acc + r.rating, 0);
    return totalRating / seller.reviews.length;
  }, [seller]);

  const relatedProducts = product
    ? mockProducts.filter(
        (p) => p.sellerId === product.sellerId && p.id !== product.id && p.status === 'available'
      )
    : [];

  if (!product || !seller) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <Button asChild>
              <Link to="/">Go back to homepage</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <BackButton />
        <AppBreadcrumb />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Image Carousel */}
          <div className="lg:col-span-2">
            <Carousel className="w-full max-w-md mx-auto lg:max-w-none lg:mx-0 sticky top-24">
              <CarouselContent>
                {product.imageUrls.map((img, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={img}
                      alt={`${product.name} image ${index + 1}`}
                      className="w-full h-auto aspect-square object-cover rounded-lg border"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-16" />
              <CarouselNext className="mr-16" />
            </Carousel>
          </div>

          {/* Product Information & Actions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3">
                <CategoryIcon category={product.category} className="h-7 w-7 text-muted-foreground" />
                <h1 className="text-3xl font-bold">{product.name}</h1>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              <p className="text-3xl font-bold text-primary">
                {formatPrice(product)}
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <div className="flex items-start gap-3 pt-1">
                <Info className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <CopyableBadge textToCopy={product.sku} />
              <Badge variant="secondary"><MapPin className="mr-1.5 h-3 w-3" /> {product.region}</Badge>
              <Badge variant="secondary"><Truck className="mr-1.5 h-3 w-3" /> {formatShippingTime(product.deliveryTimeInDays)}</Badge>
              {isAvailableInFuture && (
                <Badge variant="outline" className="text-primary border-primary">
                  <Calendar className="mr-1.5 h-3 w-3" /> Preorder
                </Badge>
              )}
              {product.isVegan && (
                <Badge variant="outline">
                  <Vegan className="mr-2 h-4 w-4" />
                  Vegan
                </Badge>
              )}
              {product.isVegetarian && !product.isVegan && (
                <Badge variant="outline">
                  <Leaf className="mr-2 h-4 w-4" />
                  Vegetarian
                </Badge>
              )}
              {product.harvestOnDemand && (
                <Badge variant="outline">
                  <Sprout className="mr-2 h-4 w-4" />
                  Harvest on Demand
                </Badge>
              )}
            </div>
            
            {/* Seller Info */}
            {seller && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Sold by</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={seller.logoUrl} />
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/seller/${seller.id}`}
                          state={{ fromProduct: { id: product.id, name: product.name } }}
                          className="font-semibold text-lg hover:underline"
                        >
                          {seller.name}
                        </Link>
                        <Badge variant="secondary" className="capitalize text-xs">
                          {seller.sellerType}
                        </Badge>
                      </div>
                      {seller.reviews.length > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <StarRating rating={averageRating} />
                          <span className="text-xs text-muted-foreground">
                            ({seller.reviews.length} reviews)
                          </span>
                        </div>
                      )}
                    </div>
                    <Button variant="secondary" asChild>
                      <Link to={`/seller/${seller.id}`} state={{ fromProduct: { id: product.id, name: product.name } }}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {isAvailableInFuture && productionDate && (
              <Card className="bg-secondary/50 border-primary/50">
                <CardContent className="p-4 flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Available for Preorder</h4>
                    <p className="text-sm text-muted-foreground">
                      This item will be ready for shipping on{" "}
                      <span className="font-medium text-foreground">{format(productionDate, "PPP")}</span>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Separator />

            {/* Details & Purchase */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Available:</span>
                      <span className="font-medium">{product.availableQuantity}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Produced on:</span>
                      <span className="font-medium">{format(new Date(product.productionDate), "PPP")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarClock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Best before:</span>
                      <span className="font-medium">{format(new Date(product.expiryDate), "PPP")}</span>
                    </div>
                  </div>
                </div>
                <Button size="lg" onClick={() => addToCart(product)} className="w-full">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-6">More from {seller.name}</h2>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {relatedProducts.map((p) => (
                  <CarouselItem key={p.id} className="pl-4 basis-1/2 md:basis-1/2 lg:basis-1/3 flex">
                    <ProductCard product={p} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {relatedProducts.length > 2 && (
                <>
                  <CarouselPrevious className="ml-16 lg:hidden" />
                  <CarouselNext className="mr-16 lg:hidden" />
                </>
              )}
              {relatedProducts.length > 3 && (
                <>
                  <CarouselPrevious className="ml-16 hidden lg:flex" />
                  <CarouselNext className="mr-16 hidden lg:flex" />
                </>
              )}
            </Carousel>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;