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
  const match = s.match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[0]) : 0;
};

export const parseQuantityToKg = (
  quantityStr: string,
  productName: string,
  category: string,
): number => {
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

  // The product price is for a specific unit (e.g., per dozen, per loaf).
  // We find a representative unit from the product's name or description to calculate price per kg.
  // A simple approach is to use the first batch as a reference for the unit size.
  const representativeBatch = product.batches[0];
  if (!representativeBatch) {
    // Assume price is per kg if no batches are defined
    return product.price;
  }

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