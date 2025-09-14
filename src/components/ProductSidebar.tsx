import { Input } from "@/components/ui/input";
import ProductFilters from "./ProductFilters";
import { Separator } from "./ui/separator";

interface ProductSidebarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  maxPrice: number;
  showVegan: boolean;
  onShowVeganChange: (checked: boolean) => void;
  showVegetarian: boolean;
  onShowVegetarianChange: (checked: boolean) => void;
  showHarvestOnDemand: boolean;
  onShowHarvestOnDemandChange: (checked: boolean) => void;
  deliverySpeed: string;
  onDeliverySpeedChange: (value: string) => void;
  showPreorder: boolean;
  onShowPreorderChange: (checked: boolean) => void;
  sellerType: string;
  onSellerTypeChange: (value: string) => void;
}

const ProductSidebar = ({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onSelectCategory,
  ...productFiltersProps
}: ProductSidebarProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Search</h3>
        <Input
          type="search"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      <Separator />
      <ProductFilters {...productFiltersProps} />
    </div>
  );
};

export default ProductSidebar;