import type { Ingredient, Product, CartItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { CheckCircle2, XCircle, ShoppingCart, Circle, Check } from "lucide-react";
import { Badge } from "./ui/badge";

interface RecipeIngredientItemProps {
  ingredient: Ingredient;
  availableProduct: Product | null;
  cartItem: CartItem | null;
  isOwned: boolean;
  onToggleOwned: (ingredientName: string) => void;
}

const RecipeIngredientItem = ({ ingredient, availableProduct, cartItem, isOwned, onToggleOwned }: RecipeIngredientItemProps) => {
  const { addToCart } = useCart();

  const getStatus = () => {
    if (cartItem) {
      return {
        icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
        badge: <Badge variant="secondary" className="bg-green-100 text-green-800">In Cart</Badge>,
        action: null,
      };
    }
    if (isOwned) {
      return {
        icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
        badge: <Badge variant="secondary" className="bg-blue-100 text-blue-800">Owned</Badge>,
        action: (
          <Button size="sm" variant="ghost" onClick={() => onToggleOwned(ingredient.name)}>
            Undo
          </Button>
        ),
      };
    }
    if (availableProduct) {
      return {
        icon: <Circle className="h-5 w-5 text-yellow-500" />,
        badge: <Badge variant="outline">Available</Badge>,
        action: (
          <Button size="sm" onClick={() => addToCart(availableProduct)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        ),
      };
    }
    return {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      badge: <Badge variant="destructive" className="bg-red-100 text-red-800">Unavailable</Badge>,
      action: (
        <Button size="sm" variant="outline" onClick={() => onToggleOwned(ingredient.name)}>
          <Check className="mr-2 h-4 w-4" />
          I have this
        </Button>
      ),
    };
  };

  const { icon, badge, action } = getStatus();

  return (
    <li className="flex items-center justify-between py-4 border-b last:border-b-0 tap-highlight-transparent">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="font-medium">{ingredient.name}</p>
          <p className="text-sm text-muted-foreground">{ingredient.quantity}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {badge}
        <div className="w-24 text-right">{action}</div>
      </div>
    </li>
  );
};

export default RecipeIngredientItem;