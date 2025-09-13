import { useState } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Home, Edit } from "lucide-react";
import { mockCustomer as initialCustomer } from "@/data/mockData";
import type { Customer } from "@/types";
import EditProfileDialog from "@/components/EditProfileDialog";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState<Customer>(initialCustomer);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleSave = (updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="flex flex-col items-center text-center p-6 bg-secondary/50">
                <Avatar className="h-24 w-24 mb-4 border-4 border-background">
                  <AvatarImage src={customer.avatarUrl} alt={`${customer.firstName} ${customer.lastName}`} />
                  <AvatarFallback>{customer.firstName.charAt(0)}{customer.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{customer.firstName} {customer.lastName}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
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