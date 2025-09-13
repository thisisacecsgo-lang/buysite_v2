import type { Seller, Product, Customer } from "@/types";
import { addDays } from "date-fns";

const now = new Date();

export const mockCustomer: Customer = {
  id: "customer-1",
  firstName: "Maria",
  lastName: "Schmidt",
  email: "maria.schmidt@example.com",
  phone: "+49 123 4567890",
  address: "Musterstraße 1, 12345 Berlin",
  avatarUrl: "/images/avatar.jpg",
};

export const mockSellers: Seller[] = [
  {
    id: "seller-1",
    name: "Karls Bauernhof",
    region: "Gettorf",
    logoUrl: "/images/fa.jpg",
    verified: true,
    location: { lat: 37.3688, lon: -122.0363 },
    reviews: [
      {
        id: "review-1",
        buyerName: "Alice",
        rating: 5,
        comment:
          "Incredibly fresh apples, will definitely buy again! The seller was very friendly.",
        date: "2025-10-25T10:00:00Z",
      },
      {
        id: "review-2",
        buyerName: "Bob",
        rating: 4,
        comment: "The eggs were great, but one was cracked. Still good value.",
        date: "2025-10-24T15:30:00Z",
      },
    ],
    totalAds: 15,
    totalSold: 12,
    profileViews: 124,
  },
  {
    id: "seller-2",
    name: "Anthony",
    region: "Felde",
    logoUrl: "/images/ava.jpg",
    verified: false,
    location: { lat: 44.7793, lon: -123.1457 },
    reviews: [
      {
        id: "review-3",
        buyerName: "Charlie",
        rating: 5,
        comment:
          "The sourdough was absolutely perfect. Best bread I have had in a long time.",
        date: "2025-10-22T08:45:00Z",
      },
    ],
    totalAds: 8,
    totalSold: 5,
    profileViews: 88,
  },
  {
    id: "seller-3",
    name: "daniel",
    region: "Gnutz",
    logoUrl: "/images/avat.jpg",
    verified: true,
    location: { lat: 48.8584, lon: -122.4331 },
    reviews: [],
    totalAds: 20,
    totalSold: 18,
    profileViews: 210,
  },
  {
    id: "seller-4",
    name: "John",
    region: "Haale",
    logoUrl: "/images/avatar.jpg",
    verified: true,
    location: { lat: 40.0150, lon: -105.2705 },
    reviews: [
      {
        id: "review-4",
        buyerName: "Diana",
        rating: 5,
        comment: "The best quinoa I've ever had. So clean and cooks perfectly.",
        date: "2024-10-28T11:00:00Z",
      },
    ],
    totalAds: 10,
    totalSold: 8,
    profileViews: 95,
  },
  {
    id: "seller-5",
    name: "Otto",
    region: "Aukrug",
    logoUrl: "/images/avata.jpg",
    verified: false,
    location: { lat: 46.1879, lon: -123.8313 },
    reviews: [
        {
            id: "review-5",
            buyerName: "Ethan",
            rating: 5,
            comment: "The oysters were incredibly fresh, like they were just pulled from the water. Amazing!",
            date: "2024-10-29T18:00:00Z",
        },
        {
            id: "review-6",
            buyerName: "Fiona",
            rating: 4,
            comment: "Smoked salmon was delicious, though a bit saltier than I prefer. Would still order again.",
            date: "2024-10-27T12:30:00Z",
        },
    ],
    totalAds: 6,
    totalSold: 4,
    profileViews: 72,
  }
];

export const mockProducts: Product[] = [
  // Seller 1: Green Valley Farms (4 products)
  {
    id: "1",
    sku: "50001",
    sellerId: "seller-1",
    name: "Apples",
    category: "Fruits and berries",
    price: 5.99,
    region: "Gettorf",
    imageUrls: ["/images/apple.jpg"],
    description:
      "Freshly picked organic Gala apples. Sweet and crisp, perfect for snacking or baking.",
    status: "available",
    createdAt: "2025-05-28T10:00:00Z",
    isVegan: true,
    isVegetarian: true,
    harvestOnDemand: false,
    deliveryTimeInDays: 1,
    freshness: "fresh",
    batches: [
      { id: "batch-1-1", productionDate: "2025-08-14T00:00:00Z", expiryDate: "2026-08-14T00:00:00Z", quantity: "1kg" },
      { id: "batch-1-2", productionDate: "2025-07-30T00:00:00Z", expiryDate: "2026-07-30T00:00:00Z", quantity: "5kg" },
      { id: "batch-1-3", productionDate: "2025-07-15T00:00:00Z", expiryDate: "2026-07-15T00:00:00Z", quantity: "10kg" },
    ]
  },
  {
    id: "4",
    sku: "50002",
    sellerId: "seller-1",
    name: "Eggs",
    category: "Animal products",
    price: 4.5,
    region: "Gettorf",
    imageUrls: ["/images/eggs.jpg"],
    description:
      "A dozen large brown eggs from happy, free-roaming chickens. Rich yolks and firm whites.",
    status: "available",
    createdAt: "2025-04-25T13:00:00Z",
    isVegan: false,
    isVegetarian: true,
    harvestOnDemand: false,
    deliveryTimeInDays: 1,
    freshness: "fresh",
    batches: [
      { id: "batch-4-1", productionDate: "2025-03-24T00:00:00Z", expiryDate: "2025-11-15T00:00:00Z", quantity: "1 dozen" }
    ]
  },
  {
    id: "10",
    sku: "50003",
    sellerId: "seller-1",
    name: "Chicken Thighs",
    category: "Meat and poultry",
    price: 12.0,
    region: "Gettorf",
    imageUrls: ["/images/c.jpg"],
    description: "Juicy and flavorful chicken thighs from pasture-raised birds.",
    status: "available",
    createdAt: "2025-04-25T13:00:00Z",
    isVegan: false,
    isVegetarian: false,
    harvestOnDemand: false,
    deliveryTimeInDays: 2,
    freshness: "frozen",
    batches: [
      { id: "batch-10-1", productionDate: "2025-06-22T00:00:00Z", expiryDate: "2025-08-21T00:00:00Z", quantity: "500g" }
    ]
  },
  {
    id: "13",
    sku: "50004",
    sellerId: "seller-1",
    name: "Carrots",
    category: "Vegetables",
    price: 3.5,
    region: "Gettorf",
    imageUrls: ["https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?q=80&w=2500&auto=format&fit=crop", "https://images.unsplash.com/photo-1582515072990-f23b7e418185?q=80&w=2500&auto=format&fit=crop", "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=2500&auto=format&fit=crop"],
    description: "Sweet and crunchy organic carrots, straight from the farm.",
    status: "available",
    createdAt: "2025-04-25T13:00:00Z",
    isVegan: true,
    isVegetarian: true,
    harvestOnDemand: true,
    deliveryTimeInDays: 1,
    freshness: "fresh",
    batches: [
      { id: "batch-13-1", productionDate: "2025-03-24T00:00:00Z", expiryDate: "2025-11-15T00:00:00Z", quantity: "1kg bunch" }
    ]
  },
  // Seller 2: Coastal Gardens (4 products)
  {
    id: "9",
    sku: "50005",
    sellerId: "seller-2",
    name: "Goat Cheese",
    category: "Dairy products",
    price: 8.5,
    region: "Felde",
    imageUrls: ["/images/ch.jpg"],
    description: "Creamy and tangy goat cheese, handmade from fresh goat milk.",
    status: "available",
    createdAt: "2025-04-25T13:00:00Z",
    isVegan: false,
    isVegetarian: true,
    harvestOnDemand: true,
    deliveryTimeInDays: 2,
    freshness: "fresh",
    batches: [
      { id: "batch-9-1", productionDate: "2025-07-12T00:00:00Z", expiryDate: "2025-10-05T00:00:00Z", quantity: "200g" }
    ]
  },
  {
    id: "12",
    sku: "50006",
    sellerId: "seller-2",
    name: "Sourdough Bread",
    category: "Bakery",
    price: 8.0,
    region: "Felde",
    imageUrls: ["/images/br.jpg"],
    description: "Crusty, tangy sourdough, baked fresh daily. Perfect for sandwiches or toast.",
    status: "available",
    createdAt: "2025-04-25T13:00:00Z",
    isVegan: true,
    isVegetarian: true,
    harvestOnDemand: false,
    deliveryTimeInDays: 1,
    freshness: "fresh",
    batches: [
      { id: "batch-12-1", productionDate: "2025-05-20T00:00:00Z", expiryDate: "2025-09-27T00:00:00Z", quantity: "1 loaf" }
    ]
  },
  {
    id: "19",
    sku: "50007",
    sellerId: "seller-2",
    name: "Raw Cow's Milk",
    category: "Dairy products",
    price: 9.0,
    region: "Felde",
    imageUrls: ["/images/mi.jpg"],
    description: "Fresh, unpasteurized raw milk from Jersey cows. Creamy and delicious.",
    status: "available",
    createdAt: "2025-04-25T13:00:00Z",
    isVegan: false,
    isVegetarian: true,
    harvestOnDemand: false,
    deliveryTimeInDays: 2,
    freshness: "fresh",
    batches: [
      { id: "batch-19-1", productionDate: "2025-08-13T00:00:00Z", expiryDate: "2025-08-30T00:00:00Z", quantity: "1L" }
    ]
  },
  {
    id: "20",
    sku: "50008",
    sellerId: "seller-2",
    name: "raw Salmon Fillet",
    category: "Seafood",
    price: 18.0,
    region: "Felde",
    imageUrls: ["/images/me.jpg"],
    description: "Sustainably sourced salmon, perfect for grilling or baking.",
    status: "available",
    createdAt: "2025-04-25T13:00:00Z",
    isVegan: false,
    isVegetarian: false,
    harvestOnDemand: false,
    deliveryTimeInDays: 2,
    freshness: "fresh",
    batches: [
      { id: "batch-20-1", productionDate: "2025-03-24T00:00:00Z", expiryDate: "2025-11-23T00:00:00Z", quantity: "1 fillet (approx. 200g)" }
    ]
  },
  // Seller 3: Berry Patch (4 products)
  {
    id: "3",
    sku: "50009",
    sellerId: "seller-3",
    name: "Homemade Strawberry Jam",
    category: "Fruits and berries",
    price: 7.0,
    region: "Gnutz",
    imageUrls: ["/images/jam.jpg"],
    description:
      "Made with love from local strawberries. No artificial preservatives. Spread it on toast or enjoy with scones.",
    status: "available",
    createdAt: "2025-04-25T13:00:00Z",
    isVegan: true,
    isVegetarian: true,
    harvestOnDemand: true,
    deliveryTimeInDays: 3,
    freshness: "canned",
    batches: [
      { id: "batch-3-1", productionDate: "2025-05-14T00:00:00Z", expiryDate: "2025-12-06T00:00:00Z", quantity: "250g jar" }
    ]
  },
  {
    id: "11",
    sku: "50010",
    sellerId: "seller-3",
    name: "Wildflower Honey",
    category: "Animal products",
    price: 9.0,
    region: "Gnutz",
    imageUrls: ["https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=2500&auto=format&fit=crop", "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=2500&auto=format&fit=crop", "https://images.unsplash.com/photo-1571108400537-e6c278735a8a?q=80&w=2500&auto=format&fit=crop"],
    description: "Raw and unfiltered honey from local wildflowers. A taste of nature.",
    status: "available",
    createdAt: "2025-04-25T13:00:00Z",
    isVegan: false,
    isVegetarian: true,
    harvestOnDemand: false,
    deliveryTimeInDays: 4,
    freshness: "canned",
    batches: [
      { id: "batch-11-1", productionDate: "2025-06-04T00:00:00Z", expiryDate: "2025-10-11T00:00:00Z", quantity: "300g jar" }
    ]
  },
  {
    id: "14",
    sku: "50011",
    sellerId: "seller-3",
    name: "Frozen Blueberries",
    category: "Fruits and berries",
    price: 10.5,
    region: "Gnutz",
    imageUrls: ["/images/bl.jpg"],
    description: "Hand-picked blueberries, frozen at peak ripeness to lock in flavor and nutrients.",
    status: "available",
    createdAt: "2025-04-25T13:00:00Z",
    isVegan: true,
    isVegetarian: true,
    harvestOnDemand: false,
    deliveryTimeInDays: 3,
    freshness: "frozen",
    batches: [
      { id: "batch-14-1", productionDate: "2025-04-08T00:00:00Z", expiryDate: "2025-09-16T00:00:00Z", quantity: "500g bag" }
    ]
  },
  {
    id: "17",
    sku: "50012",
    sellerId: "seller-3",
    name: "Fresh Raspberries",
    category: "Fruits and berries",
    price: 6.0,
    region: "Gnutz",
    imageUrls: ["/images/ras.jpg"],
    description: "Delicate and sweet raspberries, picked this morning.",
    status: "available",
    createdAt: "2025-04-25T13:00:00Z",
    isVegan: true,
    isVegetarian: true,
    harvestOnDemand: true,
    deliveryTimeInDays: 2,
    freshness: "fresh",
    batches: [
      { id: "batch-17-1", productionDate: "2025-04-30T00:00:00Z", expiryDate: "2025-08-17T00:00:00Z", quantity: "1 pint" }
    ]
  },
  // Seller 4: Mountain View Organics (4 products)
  {
    id: "26",
    sku: "50013",
    sellerId: "seller-4",
    name: "Organic Quinoa",
    category: "Bakery",
    price: 11.50,
    region: "Haale",
    imageUrls: ["/images/ki.jpg"],
    description: "High-protein organic white quinoa. A versatile and healthy grain.",
    status: "available",
    createdAt: now.toISOString(),
    isVegan: true,
    isVegetarian: true,
    harvestOnDemand: false,
    deliveryTimeInDays: 3,
    freshness: "canned",
    batches: [
      { id: "batch-26-1", productionDate: addDays(now, -30).toISOString(), expiryDate: addDays(now, 335).toISOString(), quantity: "1kg bag" }
    ]
  },

  // Seller 5: Riverbend Fishery (4 products)
  {
    id: "28",
    sku: "50014",
    sellerId: "seller-5",
    name: "Fresh Oysters",
    category: "Seafood",
    price: 24.00,
    region: "Aukrug",
    imageUrls: ["/images/ou.jpg"],
    description: "Freshly harvested oysters from the Oregon coast. Perfect for serving on the half shell.",
    status: "available",
    createdAt: now.toISOString(),
    isVegan: false,
    isVegetarian: false,
    harvestOnDemand: true,
    deliveryTimeInDays: 1,
    freshness: "fresh",
    batches: [
      { id: "batch-28-1", productionDate: addDays(now, -1).toISOString(), expiryDate: addDays(now, 2).toISOString(), quantity: "1 dozen" }
    ]
  },
  {
    id: "29",
    sku: "50015",
    sellerId: "seller-5",
    name: "Smoked Salmon",
    category: "Seafood",
    price: 16.50,
    region: "Aukrug",
    imageUrls: ["/images/sal.jpg"],
    description: "Locally caught salmon, expertly smoked over alder wood. Rich and savory.",
    status: "available",
    createdAt: addDays(now, -10).toISOString(),
    isVegan: false,
    isVegetarian: false,
    harvestOnDemand: false,
    deliveryTimeInDays: 3,
    freshness: "frozen",
    batches: [
      { id: "batch-29-1", productionDate: addDays(now, -12).toISOString(), expiryDate: addDays(now, 20).toISOString(), quantity: "200g pack" }
    ]
  },
  {
    id: "30",
    sku: "50016",
    sellerId: "seller-5",
    name: "Dungeness Crab",
    category: "Seafood",
    price: 28.00,
    region: "Aukrug",
    imageUrls: ["https://images.unsplash.com/photo-1601192042869-a8a346349df8?q=80&w=2500&auto=format&fit=crop", "https://images.unsplash.com/photo-1553634440-a396d817152e?q=80&w=2500&auto=format&fit=crop", "https://images.unsplash.com/photo-1562720131-b608a1723a95?q=80&w=2500&auto=format&fit=crop"],
    description: "A large, cooked Dungeness crab, ready to be cracked and enjoyed. Sweet and succulent meat.",
    status: "sold",
    createdAt: addDays(now, -5).toISOString(),
    isVegan: false,
    isVegetarian: false,
    harvestOnDemand: false,
    deliveryTimeInDays: 1,
    freshness: "fresh",
    batches: [
      { id: "batch-30-1", productionDate: addDays(now, -6).toISOString(), expiryDate: addDays(now, -3).toISOString(), quantity: "1 whole crab" }
    ]
  },
  {
    id: "31",
    sku: "50017",
    sellerId: "seller-5",
    name: "Canned Albacore Tuna",
    category: "Seafood",
    price: 9.50,
    region: "Aukrug",
    imageUrls: ["/images/tun.jpg"],
    description: "High-quality, line-caught albacore tuna canned in its own juices. Perfect for salads and sandwiches.",
    status: "available",
    createdAt: addDays(now, -40).toISOString(),
    isVegan: false,
    isVegetarian: false,
    harvestOnDemand: false,
    deliveryTimeInDays: 4,
    freshness: "canned",
    batches: [
      { id: "batch-31-1", productionDate: addDays(now, -50).toISOString(), expiryDate: addDays(now, 1045).toISOString(), quantity: "1 can" }
    ]
  },
];