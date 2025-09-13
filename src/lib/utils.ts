import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product, CartItem, Batch } from "@/types";

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

export function formatBatchQuantity(product: Pick<Product, 'name' | 'category'>, batch: Batch): string {
  const lowerCaseName = product.name.toLowerCase();
  const category = product.category;
  const quantityString = batch.quantity;

  // Handle eggs -> pieces
  if (category === "Animal products" && lowerCaseName.includes('egg')) {
    const num = parseFloat(quantityString) || 0;
    let count = num;
    if (quantityString.toLowerCase().includes('dozen')) {
      count = num * 12;
    }
    return `${count} ${count === 1 ? 'piece' : 'pieces'}`;
  }

  // Handle milk -> liters
  if (category === "Dairy products" && lowerCaseName.includes('milk')) {
    const num = parseFloat(quantityString) || 0;
    let volume = num;
    if (quantityString.toLowerCase().includes('ml')) {
        volume = num / 1000;
    }
    // Assuming 'L' or no unit is liters
    return `${volume} ${volume === 1 ? 'liter' : 'liters'}`;
  }

  // Handle everything else -> kg
  const num = parseFloat(quantityString) || 0;
  let weight = num;
  if (quantityString.toLowerCase().includes('g') && !quantityString.toLowerCase().includes('kg')) {
    weight = num / 1000;
  } else if (quantityString.toLowerCase().includes('kg')) {
    weight = num;
  }
  // For other units like "loaf", "pint", "can", "fillet", "bunch", parseFloat will extract the number.
  // e.g., "1 loaf" -> 1 -> 1 kg.
  return `${weight} kg`;
}