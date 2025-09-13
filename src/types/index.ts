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

export interface Batch {
  id: string;
  productionDate: string; // ISO date string
  expiryDate: string; // ISO date string
  quantity: string; // e.g., "1kg", "500g"
  price: number | "free";
  status: "available" | "sold";
  deliveryTimeInDays: number;
  freshness: "fresh" | "frozen" | "canned";
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  category: string;
  region: string;
  imageUrls: string[];
  description?: string;
  createdAt: string; // ISO date string
  isVegan: boolean;
  isVegetarian: boolean;
  harvestOnDemand: boolean;
  batches: Batch[]; // Product now has an array of batches
}

export type CartItem = Omit<Product, "batches"> & {
  batchId: string; // ID of the selected batch
  quantity: number; // Quantity of the selected batch (from the batch itself)
  price: number | "free"; // Price of the selected batch
  productionDate: string; // Production date of the selected batch
  expiryDate: string; // Expiry date of the selected batch
  deliveryTimeInDays: number; // Delivery time of the selected batch
  freshness: "fresh" | "frozen" | "canned"; // Freshness of the selected batch
};