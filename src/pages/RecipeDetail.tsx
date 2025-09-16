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
import { ShoppingCart, Check, ChefHat, Clock, BarChart3, Utensils } from "lucide-react";
import { toast } from "sonner";
import CookingMode from "@/components/CookingMode";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { cartItems, addToCart } = useCart();
  const [isCookingModeOpen, setIsCookingModeOpen] = useState(false);
  const recipe = mockRecipes.find((r) => r.id === id);

  const ingredientsWithStatus = useMemo(() => {
    if (!recipe) return [];

    return recipe.ingredients.map(ingredient => {
      const lowerIngredientName = ingredient.name.toLowerCase();
      
      const cartItem = cartItems.find(item => item.name.toLowerCase().includes(lowerIngredientName)) || null;
      
      const availableProduct = mockProducts.find(product => 
        product.status === 'available' && 
        product.name.toLowerCase().includes(lowerIngredientName)
      ) || null;

      return { ingredient, availableProduct, cartItem };
    });
  }, [recipe, cartItems]);

  const handleAddAllMissing = () => {
    const missingProducts = ingredientsWithStatus
      .filter(item => !item.cartItem && item.availableProduct)
      .map(item => item.availableProduct!);

    if (missingProducts.length === 0) {
      toast.info("All available ingredients are already in your cart!");
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

  const missingIngredientsCount = ingredientsWithStatus.filter(item => !item.cartItem && item.availableProduct).length;

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
                    </CardContent>
                  </Card>

                  {/* Ingredients Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Ingredients</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="divide-y">
                        {ingredientsWithStatus.map(({ ingredient, availableProduct, cartItem }) => (
                          <RecipeIngredientItem
                            key={ingredient.name}
                            ingredient={ingredient}
                            availableProduct={availableProduct}
                            cartItem={cartItem}
                          />
                        ))}
                      </div>
                      {missingIngredientsCount > 0 ? (
                        <Button className="w-full mt-4" onClick={handleAddAllMissing}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Buy missing ({missingIngredientsCount})
                        </Button>
                      ) : (
                        <Button className="w-full mt-4" disabled>
                          <Check className="mr-2 h-4 w-4" />
                          All ingredients in cart
                        </Button>
                      )}
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