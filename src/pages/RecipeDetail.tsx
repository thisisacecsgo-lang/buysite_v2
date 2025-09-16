import { useMemo } from "react";
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
import { ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { cartItems, addToCart } = useCart();
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <BackButton />
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-64 object-cover rounded-xl" />
            <h1 className="text-4xl font-bold mt-6">{recipe.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{recipe.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-4">
                    {recipe.instructions.map((step, index) => (
                      <li key={index} className="pl-2">{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
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
                      Add all missing ({missingIngredientsCount})
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
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetail;