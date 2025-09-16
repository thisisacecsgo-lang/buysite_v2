import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockRecipes } from "@/data/mockRecipes";
import RecipeCard from "@/components/RecipeCard";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";
import { ChefHat, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import RecipeFilters from "@/components/RecipeFilters";
import { ScrollArea } from "@/components/ui/scroll-area";

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mealType, setMealType] = useState('all');
  const [cookingTime, setCookingTime] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const { cartItems } = useCart();

  const cartItemNames = useMemo(() => 
    cartItems.map(item => item.name.toLowerCase()), 
    [cartItems]
  );

  const { suggestedRecipes, otherRecipes } = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    
    const filtered = mockRecipes.filter(recipe => {
      const searchMatch = recipe.name.toLowerCase().includes(lowercasedSearchTerm) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(lowercasedSearchTerm));
      
      const mealTypeMatch = mealType === 'all' || recipe.mealType === mealType;
      const difficultyMatch = difficulty === 'all' || recipe.difficulty === difficulty;
      const veganMatch = !isVegan || recipe.isVegan;
      const vegetarianMatch = !isVegetarian || recipe.isVegetarian;

      const cookingTimeMatch = (() => {
        if (cookingTime === 'all') return true;
        if (cookingTime === 'under30') return recipe.cookingTime <= 30;
        if (cookingTime === '30to60') return recipe.cookingTime > 30 && recipe.cookingTime <= 60;
        if (cookingTime === 'over60') return recipe.cookingTime > 60;
        return true;
      })();

      return searchMatch && mealTypeMatch && difficultyMatch && veganMatch && vegetarianMatch && cookingTimeMatch;
    });

    if (cartItemNames.length === 0) {
      return { suggestedRecipes: [], otherRecipes: filtered };
    }

    const suggested: typeof mockRecipes = [];
    const others: typeof mockRecipes = [];

    filtered.forEach(recipe => {
      const hasMatchingIngredient = recipe.ingredients.some(ing => 
        cartItemNames.some(cartName => ing.name.toLowerCase().includes(cartName))
      );
      if (hasMatchingIngredient) {
        suggested.push(recipe);
      } else {
        others.push(recipe);
      }
    });

    return { suggestedRecipes: suggested, otherRecipes: others };
  }, [searchTerm, cartItemNames, mealType, cookingTime, difficulty, isVegan, isVegetarian]);

  const filterProps = {
    mealType, onMealTypeChange: setMealType,
    cookingTime, onCookingTimeChange: setCookingTime,
    difficulty, onDifficultyChange: setDifficulty,
    isVegan, onIsVeganChange: setIsVegan,
    isVegetarian, onIsVegetarianChange: setIsVegetarian,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold">Recipe-mat</h1>
          <p className="text-muted-foreground mt-2">
            Find inspiration for your next meal and get the ingredients delivered.
          </p>
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Search</h3>
                <Input
                  type="search"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <RecipeFilters {...filterProps} />
            </div>
          </aside>
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-2xl font-bold">Recipes</h2>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters & Search
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-sm p-0">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                      <SheetHeader className="text-left mb-6">
                        <SheetTitle>Filters & Search</SheetTitle>
                      </SheetHeader>
                      <div className="space-y-6">
                        <Input
                          type="search"
                          placeholder="Search recipes..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <RecipeFilters {...filterProps} />
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>

            {suggestedRecipes.length > 0 && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <ChefHat className="h-7 w-7 text-primary" />
                  <h2 className="text-2xl font-bold">Suggested for You</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  {suggestedRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
                <Separator className="mb-12" />
              </>
            )}

            <h2 className="text-2xl font-bold mb-6 lg:hidden">All Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherRecipes.length > 0 ? (
                otherRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center py-12">No recipes found matching your criteria.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recipes;