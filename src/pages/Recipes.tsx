import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { mockRecipes } from "@/data/mockRecipes";
import RecipeCard from "@/components/RecipeCard";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";
import { ChefHat } from "lucide-react";

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = useCart();

  const cartItemNames = useMemo(() => 
    cartItems.map(item => item.name.toLowerCase()), 
    [cartItems]
  );

  const { suggestedRecipes, otherRecipes } = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    
    const filtered = mockRecipes.filter(recipe => 
      recipe.name.toLowerCase().includes(lowercasedSearchTerm) ||
      recipe.ingredients.some(ing => ing.name.toLowerCase().includes(lowercasedSearchTerm))
    );

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
  }, [searchTerm, cartItemNames]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold">Recipe-mat</h1>
          <p className="text-muted-foreground mt-2">
            Find inspiration for your next meal and get the ingredients delivered.
          </p>
          <div className="mt-6 max-w-lg mx-auto">
            <Input
              type="search"
              placeholder="Search recipes or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 text-lg"
            />
          </div>
        </section>

        {suggestedRecipes.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <ChefHat className="h-7 w-7 text-primary" />
              <h2 className="text-2xl font-bold">Suggested for You</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {suggestedRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            <Separator className="mb-12" />
          </>
        )}

        <h2 className="text-2xl font-bold mb-6">All Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherRecipes.length > 0 ? (
            otherRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full text-center">No recipes found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recipes;