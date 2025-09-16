import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

interface RecipeFiltersProps {
  mealType: string;
  onMealTypeChange: (value: string) => void;
  cookingTime: string;
  onCookingTimeChange: (value: string) => void;
  difficulty: string;
  onDifficultyChange: (value: string) => void;
  isVegan: boolean;
  onIsVeganChange: (checked: boolean) => void;
  isVegetarian: boolean;
  onIsVegetarianChange: (checked: boolean) => void;
}

const RecipeFilters = ({
  mealType, onMealTypeChange,
  cookingTime, onCookingTimeChange,
  difficulty, onDifficultyChange,
  isVegan, onIsVeganChange,
  isVegetarian, onIsVegetarianChange,
}: RecipeFiltersProps) => {
  return (
    <Accordion type="multiple" defaultValue={["mealType", "cookingTime", "difficulty", "dietary"]} className="w-full">
      <AccordionItem value="mealType">
        <AccordionTrigger className="text-lg font-semibold">Meal Type</AccordionTrigger>
        <AccordionContent>
          <RadioGroup value={mealType} onValueChange={onMealTypeChange} className="space-y-2">
            {['all', 'breakfast', 'lunch', 'dinner', 'dessert', 'snack'].map(type => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={`mt-${type}`} />
                <Label htmlFor={`mt-${type}`} className="font-normal capitalize">{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="cookingTime">
        <AccordionTrigger className="text-lg font-semibold">Cooking Time</AccordionTrigger>
        <AccordionContent>
          <RadioGroup value={cookingTime} onValueChange={onCookingTimeChange} className="space-y-2">
            {[['all', 'Any'], ['under30', '< 30 min'], ['30to60', '30-60 min'], ['over60', '> 60 min']].map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={`ct-${value}`} />
                <Label htmlFor={`ct-${value}`} className="font-normal">{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="difficulty">
        <AccordionTrigger className="text-lg font-semibold">Difficulty</AccordionTrigger>
        <AccordionContent>
          <RadioGroup value={difficulty} onValueChange={onDifficultyChange} className="space-y-2">
            {['all', 'easy', 'medium', 'hard'].map(level => (
              <div key={level} className="flex items-center space-x-2">
                <RadioGroupItem value={level} id={`d-${level}`} />
                <Label htmlFor={`d-${level}`} className="font-normal capitalize">{level}</Label>
              </div>
            ))}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="dietary">
        <AccordionTrigger className="text-lg font-semibold">Dietary</AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="vegan" className="font-normal">Vegan</Label>
            <Switch id="vegan" checked={isVegan} onCheckedChange={onIsVeganChange} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="vegetarian" className="font-normal">Vegetarian</Label>
            <Switch id="vegetarian" checked={isVegetarian} onCheckedChange={onIsVegetarianChange} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RecipeFilters;