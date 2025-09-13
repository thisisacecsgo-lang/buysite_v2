export interface Review {
  id: string;
  buyerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string; // ISO date string
}

export interface Seller {
  id: string;
  name: string;
  region: string;
  logoUrl?: string;
  reviews: Review[];
  totalAds: number;
  totalSold: number;
  profileViews?: number;
  verified: boolean;
  location: {
    lat: number;
    lon: number;
  };
}

export interface Product {
  id:string;
  sellerId: string;
  name: string;
  category: string;
  quantity: string;
  price: number | "free";
  region: string;
  imageUrls: string[];
  description?: string;
  status: "available" | "sold";
  createdAt: string; // ISO date string
  productionDate?: string; // ISO date string
  expiryDate?: string; // ISO date string
  isVegan: boolean;
  isVegetarian: boolean;
  harvestOnDemand: boolean;
  deliveryTimeInDays: number;
  freshness: "fresh" | "frozen" | "canned";
}

export type CartItem = Omit<Product, "quantity"> & {
  quantity: number;
};