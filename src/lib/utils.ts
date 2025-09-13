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
    return `${priceString} / 1 piece`;
  }

  if (category === "Dairy products" && lowerCaseName.includes('milk')) {
    return `${priceString} / 1 liter`;
  }

  return `${priceString} / 1 kg`;
}