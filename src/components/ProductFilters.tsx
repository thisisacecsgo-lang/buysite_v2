import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "./ui/separator";

interface ProductFiltersProps {
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
  cultivationMethods: {
    bioCertified: boolean;
    ecoFriendly: boolean;
    preservedProduce: boolean;
  };
  onCultivationMethodsChange: (
    method: "bioCertified" | "ecoFriendly" | "preservedProduce",
    checked: boolean,
  ) => void;
}

const ProductFilters = ({
  priceRange,
  onPriceRangeChange,
  maxPrice,
  showVegan,
  onShowVeganChange,
  showVegetarian,
  onShowVegetarianChange,
  showHarvestOnDemand,
  onShowHarvestOnDemandChange,
  deliverySpeed,
  onDeliverySpeedChange,
  showPreorder,
  onShowPreorderChange,
  sellerType,
  onSellerTypeChange,
  cultivationMethods,
  onCultivationMethodsChange,
}: ProductFiltersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="price-range">Price Range</Label>
            <span className="text-sm text-muted-foreground">
              €{priceRange[0]} - €{priceRange[1]}
            </span>
          </div>
          <Slider
            id="price-range"
            min={0}
            max={maxPrice}
            step={1}
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          />
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Seller Type</Label>
          <RadioGroup value={sellerType} onValueChange={onSellerTypeChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="st-all" />
              <Label htmlFor="st-all" className="font-normal">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="commercial" id="st-commercial" />
              <Label htmlFor="st-commercial" className="font-normal">Commercial</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="st-private" />
              <Label htmlFor="st-private" className="font-normal">Private</Label>
            </div>
          </RadioGroup>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Cultivation Method</Label>
          <div className="flex items-center justify-between">
            <Label htmlFor="bio-certified" className="font-normal">
              BIO-certified
            </Label>
            <Switch
              id="bio-certified"
              checked={cultivationMethods.bioCertified}
              onCheckedChange={(checked) => onCultivationMethodsChange('bioCertified', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="eco-friendly" className="font-normal">
              Eco-friendly
            </Label>
            <Switch
              id="eco-friendly"
              checked={cultivationMethods.ecoFriendly}
              onCheckedChange={(checked) => onCultivationMethodsChange('ecoFriendly', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="preserved-produce" className="font-normal">
              Preserved Produce
            </Label>
            <Switch
              id="preserved-produce"
              checked={cultivationMethods.preservedProduce}
              onCheckedChange={(checked) => onCultivationMethodsChange('preservedProduce', checked)}
            />
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Earliest shipping</Label>
          <RadioGroup value={deliverySpeed} onValueChange={onDeliverySpeedChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="ds-any" />
              <Label htmlFor="ds-any" className="font-normal">Any</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="today" id="ds-today" />
              <Label htmlFor="ds-today" className="font-normal">Today</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tomorrow" id="ds-tomorrow" />
              <Label htmlFor="ds-tomorrow" className="font-normal">Tomorrow</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2-3" id="ds-2-3" />
              <Label htmlFor="ds-2-3" className="font-normal">2–3 days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3+" id="ds-3+" />
              <Label htmlFor="ds-3+" className="font-normal">More than 3 days</Label>
            </div>
          </RadioGroup>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Dietary Options</Label>
          <div className="flex items-center justify-between">
            <Label htmlFor="vegan" className="font-normal">
              Vegan
            </Label>
            <Switch
              id="vegan"
              checked={showVegan}
              onCheckedChange={onShowVeganChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="vegetarian" className="font-normal">
              Vegetarian
            </Label>
            <Switch
              id="vegetarian"
              checked={showVegetarian}
              onCheckedChange={onShowVegetarianChange}
            />
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Fulfillment</Label>
          <div className="flex items-center justify-between">
            <Label htmlFor="harvest-on-demand" className="font-normal">
              Harvest on Demand
            </Label>
            <Switch
              id="harvest-on-demand"
              checked={showHarvestOnDemand}
              onCheckedChange={onShowHarvestOnDemandChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="preorder" className="font-normal">
              Preorder
            </Label>
            <Switch
              id="preorder"
              checked={showPreorder}
              onCheckedChange={onShowPreorderChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;