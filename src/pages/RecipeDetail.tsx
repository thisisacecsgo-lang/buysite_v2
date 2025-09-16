import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { mockRecipes } from "@/data/mockRecipes";
import { mockProducts } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import RecipeIngredientItem from "@/components/RecipeIngredientItem";
import { ShoppingCart, Check, ChefHat, Clock, BarChart3, Utensils, Vegan, Leaf } from "lucide-react";
import { toast } from "sonner";
import CookingMode from "@/components/CookingMode";
import { Badge } from "@/components/ui/badge";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { cartItems, addToCart } = useCart();
  const [isCookingModeOpen, setIsCookingModeOpen] = useState(false);
  const [ownedIngredients, setOwnedIngredients] = useState<string[]>([]);
  const recipe = mockRecipes.find((r) => r.id === id);

  const toggleOwnedIngredient = (ingredientName: string) => {
    setOwnedIngredients(prev =>
      prev.includes(ingredientName)
        ? prev.filter(name => name !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const ingredientsWithStatus = useMemo(() => {
    if (!recipe) return [];

    return recipe.ingredients.map(ingredient => {
      const lowerIngredientName = ingredient.name.toLowerCase();
      
      const cartItem = cartItems.find(item => item.name.toLowerCase().includes(lowerIngredientName)) || null;
      
      const availableProduct = mockProducts.find(product => 
        product.status === 'available' && 
        product.name.toLowerCase().includes(lowerIngredientName)
      ) || null;

      const isOwned = ownedIngredients.includes(ingredient.name);

      return { ingredient, availableProduct, cartItem, isOwned };
    });
  }, [recipe, cartItems, ownedIngredients]);

  const handleAddAllMissing = () => {
    const missingProducts = ingredientsWithStatus
      .filter(item => !item.cartItem && !item.isOwned && item.availableProduct)
      .map(item => item.availableProduct!);

    if (missingProducts.length === 0) {
      toast.info("All available ingredients are already in your cart or marked as owned!");
      return;
    }

    missingProducts.forEach(product => addToCart(product));
    toast.success(`Added ${missingProducts.length} missing ingredients to your cart.`);
  };

  if (!recipe) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
            <Button asChild>
              <Link to="/recipes">Go back to recipes</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const missingIngredientsCount = ingredientsWithStatus.filter(item => !item.cartItem && !item.isOwned && item.availableProduct).length;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-8">
          <BackButton />
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{recipe.name}</h1>
              <p className="text-lg text-muted-foreground">{recipe.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left Column: Image and Instructions */}
              <div className="lg:col-span-2 space-y-8">
                <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-auto max-h-[500px] object-cover rounded-xl border" />
                
                {/* Instructions Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Instructions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ol className="divide-y">
                      {recipe.instructions.map((step, index) => (
                        <li key={index} className="flex items-start gap-4 p-6">
                          <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold text-xl mt-1">
                            {index + 1}
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-base">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Details, Ingredients, Actions */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Actions Card */}
                  <Card className="bg-secondary/50">
                    <CardContent className="p-6">
                      <Button size="lg" className="w-full text-lg py-6" onClick={() => setIsCookingModeOpen(true)}>
                        <ChefHat className="mr-3 h-6 w-6" />
                        Start Cooking
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Details Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Cooking Time:</span>
                        <span className="text-muted-foreground">{recipe.cookingTime} min</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Difficulty:</span>
                        <span className="text-muted-foreground capitalize">{recipe.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Utensils className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Meal Type:</span>
                        <span className="text-muted-foreground capitalize">{recipe.mealType}</span>
                      </div>
                      {(recipe.isVegan || recipe.isVegetarian) && (
                        <div className="flex items-center gap-2 pt-2">
                          {recipe.isVegan && (
                            <Badge variant="outline">
                              <Vegan className="mr-2 h-4 w-4" />
                              Vegan
                            </Badge>
                          )}
                          {recipe.isVegetarian && !recipe.isVegan && (
                            <Badge variant="outline">
                              <Leaf className="mr-2 h-4 w-4" />
                              Vegetarian
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Ingredients Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Ingredients</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="px-6">
                        {ingredientsWithStatus.map(({ ingredient, availableProduct, cartItem, isOwned }) => (
                          <RecipeIngredientItem
                            key={ingredient.name}
                            ingredient={ingredient}
                            availableProduct={availableProduct}
                            cartItem={cartItem}
                            isOwned={isOwned}
                            onToggleOwned={toggleOwnedIngredient}
                          />
                        ))}
                      </ul>
                      <div className="p-6 pt-4">
                        {missingIngredientsCount > 0 ? (
                          <Button className="w-full" onClick={handleAddAllMissing}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Buy missing ({missingIngredientsCount})
                          </Button>
                        ) : (
                          <Button className="w-full" disabled>
                            <Check className="mr-2 h-4 w-4" />
                            All ingredients in cart
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <CookingMode 
        isOpen={isCookingModeOpen}
        onClose={() => setIsCookingModeOpen(false)}
        recipe={recipe}
      />
    </>
  );
};

export default RecipeDetail;