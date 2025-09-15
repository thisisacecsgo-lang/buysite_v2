import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product, CartItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(product: Pick<Product | CartItem, 'price' | 'name' | 'category'>): string {
  if (typeof product.price !== 'number') {
    return "Free";
  }

  const priceString = `€${product.price.toFixed(2)}`;
  const lowerCaseName = product.name.toLowerCase();
  const category = product.category;

  if (category === "Animal products" && lowerCaseName.includes('egg')) {
    return `${priceString} / piece`;
  }

  if (category === "Dairy products" && lowerCaseName.includes('milk')) {
    return `${priceString} / liter`;
  }

  return `${priceString} / kg`;
}

export function formatShippingTime(days: number): string {
  if (days <= 1) {
    return "Today";
  }
  if (days === 2) {
    return "Tomorrow";
  }
  return `in ${days} days`;
}