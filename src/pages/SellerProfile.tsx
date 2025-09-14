import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockSellers, mockProducts } from "@/data/mockData";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, MapPin, MessageSquare, Archive } from "lucide-react";
import ProductList from "@/components/ProductList";
import type { Review, Product } from "@/types";
import { format } from "date-fns";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import BackButton from "@/components/BackButton";
import { Footer } from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";

const ReviewCard = ({ review }: { review: Review }) => (
  <Card>
    <CardHeader className="flex-row items-start justify-between pb-2">
      <div>
        <CardTitle className="text-md">{review.buyerName}</CardTitle>
        <p className="text-xs text-muted-foreground">{format(new Date(review.date), "PPP")}</p>
      </div>
      <StarRating rating={review.rating} />
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{review.comment}</p>
    </CardContent>
  </Card>
);

const SellerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const seller = mockSellers.find((s) => s.id === id);

  const { availableProducts, soldProducts, averageRating, availableCategories } = useMemo(() => {
    if (!seller) {
      return { availableProducts: [], soldProducts: [], averageRating: 0, availableCategories: [] };
    }
    
    const sellerProducts = mockProducts.filter((p) => p.sellerId === seller.id);
    
    const avg =
      seller.reviews.length > 0
        ? seller.reviews.reduce((acc, r) => acc + r.rating, 0) / seller.reviews.length
        : 0;

    const filterAndSort = (products: Product[]) => {
      return products
        .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
        .sort((a, b) => {
          if (sortBy === 'newest') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          if (sortBy === 'oldest') {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          }
          return 0;
        });
    }

    const available = filterAndSort(sellerProducts.filter((p) => p.status === "available"));
    const sold = filterAndSort(sellerProducts.filter((p) => p.status === "sold"));
    
    const categories = [...new Set(sellerProducts.map(p => p.category))];

    return {
      availableProducts: available,
      soldProducts: sold,
      averageRating: avg,
      availableCategories: categories,
    };
  }, [seller, categoryFilter, sortBy]);

  if (!seller) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Seller not found</h2>
            <Button asChild>
              <Link to="/">Go back to homepage</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const descriptionParts = [
    seller.age && `Age: ${seller.age}`,
    seller.production && `Production: ${seller.production}`,
    seller.motivation && `Motivation: ${seller.motivation}`,
    seller.values && `Values: ${seller.values}`,
    seller.background && `Background: ${seller.background}`,
  ].filter(Boolean);
  const description = descriptionParts.join(" • ");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <BackButton />
        <AppBreadcrumb />
        <Card className="mb-8">
          <CardContent className="p-6 flex flex-col md:flex-row items-start gap-6">
            <Avatar className="h-24 w-24 border">
              <AvatarImage src={seller.logoUrl} alt={seller.name} />
              <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow space-y-2">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">{seller.name}</h1>
                <Badge variant={seller.sellerType === 'commercial' ? 'default' : 'secondary'} className="capitalize">
                  {seller.sellerType}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{seller.region}</span>
              </div>
              {description && (
                <p className="text-sm text-muted-foreground pt-1">{description}</p>
              )}
              <div className="flex items-center gap-2 pt-1">
                <StarRating rating={averageRating} />
                <span className="text-sm text-muted-foreground">
                  ({averageRating.toFixed(1)} from {seller.reviews.length} reviews)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
              <Archive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{seller.totalSold}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{seller.reviews.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({seller.reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="mt-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {availableCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Date: Newest first</SelectItem>
                  <SelectItem value="oldest">Date: Oldest first</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Tabs defaultValue="available">
              <TabsList>
                <TabsTrigger value="available">Current ({availableProducts.length})</TabsTrigger>
                <TabsTrigger value="sold">Sold ({soldProducts.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="available" className="mt-6">
                <ProductList products={availableProducts} />
              </TabsContent>
              <TabsContent value="sold" className="mt-6">
                <ProductList products={soldProducts} />
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            {seller.reviews.length > 0 ? (
              <div className="space-y-4">
                {seller.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold">No reviews yet</h3>
                <p className="text-muted-foreground">This seller hasn't received any reviews.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default SellerProfile;