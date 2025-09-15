import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Home, Edit, Star, MessageSquare } from "lucide-react";
import { mockCustomer as initialCustomer, mockSellers, mockProducts } from "@/data/mockData";
import type { Customer, Review } from "@/types";
import EditProfileDialog from "@/components/EditProfileDialog";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import BackButton from "@/components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerReviewCard from "@/components/CustomerReviewCard";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState<Customer>(initialCustomer);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleSave = (updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
  };

  const customerReviews = useMemo(() => {
    const allReviews: (Review & { sellerId: string })[] = mockSellers.flatMap(seller =>
      seller.reviews.map(review => ({ ...review, sellerId: seller.id }))
    );
    return allReviews.filter(review => review.customerId === customer.id);
  }, [customer.id]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-8">
          <BackButton />
          <AppBreadcrumb />
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={customer.avatarUrl} alt={`${customer.firstName} ${customer.lastName}`} />
                <AvatarFallback>{customer.firstName.charAt(0)}{customer.lastName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{customer.firstName} {customer.lastName}</h1>
                <p className="text-muted-foreground">Welcome to your profile page.</p>
              </div>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">My Details</TabsTrigger>
                <TabsTrigger value="reviews">My Reviews ({customerReviews.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Home className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{customer.address}</span>
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button className="w-full" onClick={() => setIsEditDialogOpen(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {customerReviews.length > 0 ? (
                      <div className="space-y-4">
                        {customerReviews.map(review => {
                          const product = mockProducts.find(p => p.id === review.productId);
                          const seller = mockSellers.find(s => s.id === product?.sellerId);
                          if (!product || !seller) return null;
                          return <CustomerReviewCard key={review.id} review={review} product={product} seller={seller} />;
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No Reviews Yet</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          When you review a product, it will appear here.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
      <EditProfileDialog
        customer={customer}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSave}
      />
    </>
  );
};

export default CustomerProfile;