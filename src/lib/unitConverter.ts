import type { Product } from "@/types";

// Assumptions for converting non-weight units to kg
const UNIT_TO_KG_MAP = {
  EGG_PIECE: 0.06, // 60g
  BREAD_LOAF: 0.8, // 800g
  RASPBERRY_PINT: 0.34, // 340g
  SALMON_FILLET: 0.2, // 200g
  CRAB_WHOLE: 0.9, // 900g
  TUNA_CAN: 0.15, // 150g
  OYSTER_DOZEN: 1.0, // 1kg
};

const getNumberFromString = (s: string): number => {
  if (!s) return 0;
  const match = s.match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[0]) : 0;
};

export const parseQuantityToKg = (
  quantityStr: string,
  productName: string,
  category: string,
): number => {
  // Guard against undefined or null inputs
  if (!quantityStr || !productName || !category) {
    return getNumberFromString(quantityStr || "");
  }

  const lowerName = productName.toLowerCase();
  const num = getNumberFromString(quantityStr);
  const lowerQuantityStr = quantityStr.toLowerCase();

  if (lowerQuantityStr.includes("kg")) return num;
  if (lowerQuantityStr.includes("g")) return num / 1000;
  if (lowerQuantityStr.includes("ml")) return num / 1000; // Assuming 1ml ~ 1g
  if (lowerQuantityStr.includes("l")) return num; // Assuming 1L ~ 1kg

  if (category === "Animal products" && lowerName.includes("egg")) {
    const count = lowerQuantityStr.includes("dozen") ? num * 12 : num;
    return count * UNIT_TO_KG_MAP.EGG_PIECE;
  }
  if (category === "Bakery" && lowerName.includes("bread")) {
    return num * UNIT_TO_KG_MAP.BREAD_LOAF;
  }
  if (
    category === "Fruits and berries" &&
    lowerName.includes("raspberries")
  ) {
    return num * UNIT_TO_KG_MAP.RASPBERRY_PINT;
  }
  if (category === "Seafood" && lowerName.includes("salmon")) {
    return UNIT_TO_KG_MAP.SALMON_FILLET * num;
  }
  if (category === "Seafood" && lowerName.includes("crab")) {
    return num * UNIT_TO_KG_MAP.CRAB_WHOLE;
  }
  if (category === "Seafood" && lowerName.includes("tuna")) {
    return num * UNIT_TO_KG_MAP.TUNA_CAN;
  }
  if (category === "Seafood" && lowerName.includes("oyster")) {
    return num * UNIT_TO_KG_MAP.OYSTER_DOZEN;
  }

  // Fallback for ambiguous units like "bunch", "pack", "piece"
  // We assume the price is per kg if we cannot determine the unit weight.
  return num;
};

export const getPricePerKg = (product: Product): number => {
  if (typeof product.price !== "number") return 0;

  // Guard against missing or empty batches array, which can happen with stale localStorage data
  if (!product.batches || product.batches.length === 0) {
    // Assume price is per kg if no batches are defined
    return product.price;
  }

  const representativeBatch = product.batches[0];

  const batchWeightInKg = parseQuantityToKg(
    representativeBatch.quantity,
    product.name,
    product.category,
  );

  if (batchWeightInKg > 0) {
    return product.price / batchWeightInKg;
  }

  // Fallback if we can't determine weight, assume price is per kg.
  return product.price;
};

// New functions for display unit conversion
export type DisplayUnit = "kg" | "L" | "piece";

export const getDisplayUnit = (productName: string, category: string): DisplayUnit => {
  if (!productName || !category) return "kg";
  const lowerName = productName.toLowerCase();
  if (category === "Dairy products" && lowerName.includes('milk')) {
    return 'L';
  }
  if (category === "Animal products" && lowerName.includes('egg')) {
    return 'piece';
  }
  return 'kg';
};

export const convertKgToDisplayUnit = (kg: number, productName: string, category: string): number => {
  const unit = getDisplayUnit(productName, category);
  if (unit === 'piece') {
    return kg / UNIT_TO_KG_MAP.EGG_PIECE;
  }
  if (unit === 'L') {
    return kg; // Assuming 1L ~ 1kg for milk
  }
  return kg;
};

export const convertDisplayUnitToKg = (displayValue: number, productName: string, category: string): number => {
  const unit = getDisplayUnit(productName, category);
  if (unit === 'piece') {
    return displayValue * UNIT_TO_KG_MAP.EGG_PIECE;
  }
  if (unit === 'L') {
    return displayValue;
  }
  return displayValue;
};

export const getPricePerDisplayUnit = (product: Product): number => {
  const pricePerKg = getPricePerKg(product);
  const unit = getDisplayUnit(product.name, product.category);
  if (unit === 'piece') {
    return pricePerKg * UNIT_TO_KG_MAP.EGG_PIECE;
  }
  if (unit === 'L') {
    return pricePerKg; // Since 1L ~ 1kg
  }
  return pricePerKg;
};

export const getMaxQuantityInDisplayUnit = (batchQuantity: string, productName: string, category: string): number => {
  const maxKg = parseQuantityToKg(batchQuantity, productName, category);
  return convertKgToDisplayUnit(maxKg, productName, category);
};

export const getStepForDisplayUnit = (displayUnit: DisplayUnit): number => {
  if (displayUnit === 'piece') return 1;
  if (displayUnit === 'L') return 0.1; // 100ml increments
  return 0.05; // 50g increments
};