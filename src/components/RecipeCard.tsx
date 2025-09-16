import type { Recipe } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

const RecipeCard = ({ recipe, className }: RecipeCardProps) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="group">
      <Card className={cn("w-full flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-xl", className)}>
        <CardHeader className="p-0">
          <div className="overflow-hidden relative rounded-t-xl">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
            {recipe.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2 flex-grow">
            {recipe.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3 pt-3 border-t">
            <Utensils className="h-3 w-3" />
            <span>{recipe.ingredients.length} Ingredients</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;