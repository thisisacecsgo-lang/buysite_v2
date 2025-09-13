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
import BatchesTable from "@/components/BatchesTable";
import { formatPrice } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const product = mockProducts.find((p) => p.id === id);
  const seller = product
    ? mockSellers.find((s) => s.id === product.sellerId)
    : undefined;

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
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <Carousel className="w-full">
              <CarouselContent>
                {product.imageUrls.map((img, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={img}
                      alt={`${product.name} image ${index + 1}`}
                      className="w-full h-auto aspect-[4/3] object-cover rounded-lg border"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-16" />
              <CarouselNext className="mr-16" />
            </Carousel>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <CategoryIcon category={product.category} className="h-8 w-8 text-muted-foreground" />
              <h1 className="text-4xl font-bold">{product.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-6 w-6 text-primary" />
              <p className="text-3xl font-semibold text-primary">
                {formatPrice(product)}
              </p>
            </div>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{product.region}</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span>Delivery: {product.deliveryTimeInDays} day(s)</span>
              </div>
              {product.description && (
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-muted-foreground mt-1" />
                  <p className="text-muted-foreground text-base">
                    {product.description}
                  </p>
                </div>
              )}
              {product.isVegan && (
                 <div className="flex items-start gap-3">
                  <Vegan className="h-5 w-5 text-muted-foreground mt-1" />
                  <span className="text-base">Vegan</span>
                </div>
              )}
              {product.isVegetarian && !product.isVegan && (
                 <div className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-muted-foreground mt-1" />
                  <span className="text-base">Vegetarian</span>
                </div>
              )}
            </div>
            {seller && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">Sold by</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={seller.logoUrl} />
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <Link
                        to={`/seller/${seller.id}`}
                        className="font-semibold text-lg hover:underline"
                      >
                        {seller.name}
                      </Link>
                    </div>
                    <Button variant="secondary" asChild>
                      <Link to={`/seller/${seller.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {product.batches && product.batches.length > 0 ? (
          <BatchesTable product={product} />
        ) : (
          <p className="mt-8 text-center text-muted-foreground">
            No available batches for this product.
          </p>
        )}

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
                  <CarouselItem key={p.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <ProductCard product={p} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-16" />
              <CarouselNext className="mr-16" />
            </Carousel>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;